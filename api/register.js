// Vercel Serverless Function — POST /api/register
// Stores waitlist signups to JSONBin.io (free persistent JSON store)

const JSONBIN_API_KEY = process.env.JSONBIN_API_KEY;
const JSONBIN_BIN_ID  = process.env.JSONBIN_BIN_ID;
const JSONBIN_BASE    = 'https://api.jsonbin.io/v3';

async function readBin() {
    const res = await fetch(`${JSONBIN_BASE}/b/${JSONBIN_BIN_ID}/latest`, {
        headers: {
            'X-Master-Key': JSONBIN_API_KEY,
            'X-Bin-Meta': 'false'
        }
    });
    if (!res.ok) throw new Error(`JSONBin read failed: ${res.status}`);
    const data = await res.json();
    return Array.isArray(data) ? data : [];
}

async function writeBin(records) {
    const res = await fetch(`${JSONBIN_BASE}/b/${JSONBIN_BIN_ID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-Master-Key': JSONBIN_API_KEY
        },
        body: JSON.stringify(records)
    });
    if (!res.ok) throw new Error(`JSONBin write failed: ${res.status}`);
    return res.json();
}

export default async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    if (!JSONBIN_API_KEY || !JSONBIN_BIN_ID) {
        console.error('Missing JSONBIN_API_KEY or JSONBIN_BIN_ID env vars');
        return res.status(500).json({ error: 'Server configuration error' });
    }

    try {
        const { name, email, phone, companySize, consentMandatory, consentMarketing, source } = req.body;

        if (!name || !email) {
            return res.status(400).json({ error: 'Name and email are required' });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email address' });
        }

        // Read current registrations
        const registrations = await readBin();

        // Check for duplicate email
        const duplicate = registrations.find(r => r.email.toLowerCase() === email.toLowerCase());
        if (duplicate) {
            // Return success anyway — don't tell user they're a duplicate
            return res.status(200).json({ json: { name, email, phone }, success: true, existing: true });
        }

        // Add new entry
        const newEntry = {
            name: name.trim(),
            email: email.trim().toLowerCase(),
            phone: phone ? phone.trim() : 'N/A',
            companySize: companySize || 'N/A',
            consentMandatory: consentMandatory === true,
            consentMarketing: consentMarketing === true,
            source: source || 'landing_page',
            timestamp: new Date().toISOString()
        };

        registrations.push(newEntry);
        await writeBin(registrations);

        console.log(`✅ Registered: ${name} <${email}> (${phone})`);

        // Send confirmation and notification emails
        try {
            const { sendRegistrationEmails } = require('../mailer');
            await sendRegistrationEmails({ name: newEntry.name, email: newEntry.email, phone: newEntry.phone, companySize: newEntry.companySize });
        } catch (mailError) {
            console.error('Error triggering emails:', mailError);
        }

        return res.status(200).json({ json: newEntry, success: true });

    } catch (err) {
        console.error('Registration error:', err.message);
        return res.status(500).json({ error: 'Failed to save registration. Please try again.' });
    }
}
