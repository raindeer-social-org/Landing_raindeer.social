// Vercel Serverless Function — GET /api/registrations
// Returns all waitlist signups as JSON from JSONBin.io

const JSONBIN_API_KEY = process.env.JSONBIN_API_KEY;
const JSONBIN_BIN_ID  = process.env.JSONBIN_BIN_ID;
const JSONBIN_BASE    = 'https://api.jsonbin.io/v3';

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    if (!JSONBIN_API_KEY || !JSONBIN_BIN_ID) {
        return res.status(500).json({ error: 'Server configuration error' });
    }

    try {
        const response = await fetch(`${JSONBIN_BASE}/b/${JSONBIN_BIN_ID}/latest`, {
            headers: {
                'X-Master-Key': JSONBIN_API_KEY,
                'X-Bin-Meta': 'false'
            }
        });

        if (!response.ok) throw new Error(`JSONBin read failed: ${response.status}`);

        const data = await response.json();
        const registrations = Array.isArray(data) ? data : [];

        // Sort newest first
        registrations.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        return res.status(200).json(registrations);

    } catch (err) {
        console.error('Fetch registrations error:', err.message);
        return res.status(500).json({ error: 'Failed to retrieve registrations' });
    }
}
