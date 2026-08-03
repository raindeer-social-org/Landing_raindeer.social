require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;
const DATA_DIR = process.env.DATA_DIR || (fs.existsSync('/data') ? '/data' : __dirname);
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}
const DB_FILE = path.join(DATA_DIR, 'registrations.json');

app.use(express.json());

// Enable CORS for Vercel frontend requests
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

// Serve static files from the project root
app.use(express.static(__dirname));

// Helper for reading registrations asynchronously
async function getRegistrations() {
    try {
        await fs.promises.access(DB_FILE);
        const data = await fs.promises.readFile(DB_FILE, 'utf8');
        return JSON.parse(data || '[]');
    } catch (err) {
        if (err.code !== 'ENOENT') {
            console.error('Error reading registrations file:', err);
        }
        return [];
    }
}

// Route to register a user
app.post('/api/register', async (req, res) => {
    const { name, email, phone, companySize, consentMandatory, consentMarketing } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }

    // Read current registrations
    let registrations = await getRegistrations();

    // Add new registration with timestamp
    const newRegistration = {
        name,
        email,
        phone: phone || 'N/A',
        companySize: companySize || 'N/A',
        consentMandatory: consentMandatory === true,
        consentMarketing: consentMarketing === true,
        timestamp: new Date().toISOString()
    };
    registrations.push(newRegistration);

    // Save back to JSON file
    try {
        await fs.promises.writeFile(DB_FILE, JSON.stringify(registrations, null, 2), 'utf8');
    } catch (err) {
        console.error('Error writing to registrations file:', err);
        return res.status(500).json({ error: 'Failed to save registration' });
    }

    console.log(`Registered user: ${name} (${email}) (${phone})`);
    
    // Send confirmation and notification emails
    try {
        const { sendRegistrationEmails } = require('./mailer');
        sendRegistrationEmails({ name: newRegistration.name, email: newRegistration.email, phone: newRegistration.phone, companySize: newRegistration.companySize });
    } catch (mailError) {
        console.error('Error triggering emails:', mailError);
    }

    // Return dummy response structure matching httpbin to keep frontend response mapping happy
    return res.status(200).json({
        json: newRegistration,
        success: true
    });
});

// Endpoint to view all registrations
app.get('/api/registrations', async (req, res) => {
    const registrations = await getRegistrations();
    res.json(registrations);
});

// Serve landing page by default
app.get('/admin-dashboard', async (req, res) => {
    if (req.query.passcode !== '123321') {
        return res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Secure Area — raindeer.social</title>
            <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap" rel="stylesheet">
            <style>
                body { background: #050507; color: #fff; font-family: 'Outfit', sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; background-image: radial-gradient(circle, rgba(74, 124, 255, 0.1) 1.2px, transparent 1.2px); background-size: 40px 40px; }
                .auth-card { background: rgba(10, 10, 12, 0.7); border: 1px solid rgba(255, 255, 255, 0.05); padding: 40px; border-radius: 16px; text-align: center; backdrop-filter: blur(12px); box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5); }
                h2 { margin-top: 0; color: #fff; }
                input { padding: 12px 16px; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.1); background: rgba(0, 0, 0, 0.5); color: #fff; font-family: monospace; font-size: 1.2rem; text-align: center; outline: none; transition: border-color 0.2s; letter-spacing: 4px; width: 150px; }
                input:focus { border-color: #4a7cff; }
                button { background: #4a7cff; color: white; border: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; cursor: pointer; transition: background 0.2s; margin-top: 20px; font-size: 1rem; width: 100%; }
                button:hover { background: #38d9ff; }
            </style>
        </head>
        <body>
            <div class="auth-card">
                <h2>Access Dashboard</h2>
                <form method="GET">
                    <input type="text" name="passcode" required autofocus placeholder="------" maxlength="6" style="-webkit-text-security: disc; text-align: center; font-family: monospace;" />
                    <br>
                    <button type="submit">Unlock</button>
                    ${req.query.passcode ? '<div style="color: #ff4a4a; font-size: 0.85rem; margin-top: 15px;">Incorrect passcode</div>' : ''}
                </form>
            </div>
        </body>
        </html>
        `);
    }

    let registrations = await getRegistrations();
    
    // Sort registrations: newest first
    registrations.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    let rowsHtml = '';
    registrations.forEach((u) => {
        const dateStr = new Date(u.timestamp).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
        rowsHtml += `
            <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.04); transition: background 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.02)'" onmouseout="this.style.background='transparent'">
                <td style="padding: 16px; color: #fff; font-weight: 500;">${u.name}</td>
                <td style="padding: 16px; color: #38d9ff; font-family: monospace;">${u.email}</td>
                <td style="padding: 16px; color: #8b6cff; font-family: monospace;">${u.phone || 'N/A'}</td>
                <td style="padding: 16px; color: #a1a1aa;">${u.companySize}</td>
                <td style="padding: 16px; color: #71717a; font-size: 0.85rem;">${dateStr}</td>
            </tr>
        `;
    });

    if (registrations.length === 0) {
        rowsHtml = `
            <tr>
                <td colspan="5" style="padding: 40px; text-align: center; color: #71717a;">No registrations yet.</td>
            </tr>
        `;
    }

    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>raindeer.social — Registrations Dashboard</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Space+Mono&display=swap" rel="stylesheet">
        <style>
            :root {
                --bg-pure: #050507;
                --raindeer-blue: #4a7cff;
                --raindeer-cyan: #38d9ff;
            }
            body {
                background: var(--bg-pure);
                color: #e4e4e7;
                font-family: 'Outfit', sans-serif;
                margin: 0;
                padding: 40px 24px;
                min-height: 100vh;
                background-image: radial-gradient(circle, rgba(74, 124, 255, 0.1) 1.2px, transparent 1.2px);
                background-size: 40px 40px;
            }
            .dashboard {
                max-width: 900px;
                margin: 0 auto;
                background: rgba(10, 10, 12, 0.7);
                border: 1px solid rgba(255, 255, 255, 0.05);
                border-radius: 16px;
                padding: 32px;
                backdrop-filter: blur(12px);
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
            }
            .header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                padding-bottom: 24px;
                margin-bottom: 24px;
            }
            h1 {
                margin: 0;
                font-size: 1.8rem;
                font-weight: 700;
                background: linear-gradient(135deg, #fff 0%, #a1a1aa 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
            .stats {
                font-family: 'Space Mono', monospace;
                font-size: 0.85rem;
                color: var(--raindeer-cyan);
                background: rgba(56, 217, 255, 0.05);
                border: 1px solid rgba(56, 217, 255, 0.15);
                padding: 6px 12px;
                border-radius: 8px;
            }
            table {
                width: 100%;
                border-collapse: collapse;
                text-align: left;
            }
            th {
                padding: 16px;
                font-size: 0.85rem;
                text-transform: uppercase;
                letter-spacing: 0.05em;
                color: #71717a;
                font-weight: 600;
                border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            }
        </style>
    </head>
    <body>
        <div class="dashboard">
            <div class="header">
                <div>
                    <h1>raindeer.social</h1>
                    <div style="color: #71717a; font-size: 0.9rem; margin-top: 4px;">Waitlist Signups Dashboard</div>
                </div>
                <div class="stats">${registrations.length} Signups</div>
            </div>
            <div style="overflow-x: auto;">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Company Size</th>
                            <th>Signed Up At (IST)</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rowsHtml}
                    </tbody>
                </table>
            </div>
        </div>
    </body>
    </html>
    `;
    res.send(html);
});

app.get(['/about', '/about.html'], (req, res) => {
    res.sendFile(path.join(__dirname, 'about.html'));
});

app.get(['/privacy', '/privacy.html'], (req, res) => {
    res.sendFile(path.join(__dirname, 'privacy.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
