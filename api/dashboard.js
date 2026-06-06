// Vercel Serverless Function — GET /registration
// Renders a beautiful visual dashboard of all waitlist signups

const JSONBIN_API_KEY = process.env.JSONBIN_API_KEY;
const JSONBIN_BIN_ID  = process.env.JSONBIN_BIN_ID;
const JSONBIN_BASE    = 'https://api.jsonbin.io/v3';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).send('Method not allowed');
    }

    let registrations = [];
    let fetchError = null;

    if (!JSONBIN_API_KEY || !JSONBIN_BIN_ID) {
        fetchError = 'Server configuration error: missing environment variables.';
    } else {
        try {
            const response = await fetch(`${JSONBIN_BASE}/b/${JSONBIN_BIN_ID}/latest`, {
                headers: {
                    'X-Master-Key': JSONBIN_API_KEY,
                    'X-Bin-Meta': 'false'
                }
            });
            if (!response.ok) throw new Error(`JSONBin returned ${response.status}`);
            const data = await response.json();
            registrations = Array.isArray(data) ? data : [];
            registrations.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        } catch (err) {
            fetchError = `Could not fetch registrations: ${err.message}`;
        }
    }

    // Build table rows
    let rowsHtml = '';
    if (fetchError) {
        rowsHtml = `<tr><td colspan="4" class="empty-state error-state">⚠️ ${fetchError}</td></tr>`;
    } else if (registrations.length === 0) {
        rowsHtml = `<tr><td colspan="4" class="empty-state">🦌 No signups yet — share the landing page to get started!</td></tr>`;
    } else {
        registrations.forEach((u, i) => {
            const dateStr = new Date(u.timestamp).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' });
            const initials = (u.name || '?').split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
            const companySizeLabel = u.companySize && u.companySize !== 'N/A' ? u.companySize : '—';
            rowsHtml += `
            <tr class="data-row">
                <td class="td-num">${i + 1}</td>
                <td>
                    <div class="name-cell">
                        <div class="avatar">${initials}</div>
                        <span>${escapeHtml(u.name)}</span>
                    </div>
                </td>
                <td><span class="email-chip">${escapeHtml(u.email)}</span></td>
                <td><span class="size-badge">${escapeHtml(companySizeLabel)}</span></td>
                <td class="td-date">${dateStr}</td>
            </tr>`;
        });
    }

    const totalCount = registrations.length;

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>raindeer.social — Signups Dashboard</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
    <style>
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
            --bg: #04040a;
            --surface: rgba(12, 12, 20, 0.85);
            --border: rgba(255,255,255,0.07);
            --blue: #4a7cff;
            --cyan: #38d9ff;
            --purple: #8b6cff;
            --text: #e4e4e7;
            --muted: #71717a;
            --subtle: #a1a1aa;
        }

        body {
            background: var(--bg);
            color: var(--text);
            font-family: 'Outfit', sans-serif;
            min-height: 100vh;
            padding: 40px 24px 80px;
            background-image:
                radial-gradient(ellipse 80% 40% at 50% -10%, rgba(74,124,255,0.12) 0%, transparent 60%),
                radial-gradient(circle, rgba(74,124,255,0.04) 1px, transparent 1px);
            background-size: auto, 40px 40px;
        }

        .wrapper {
            max-width: 1000px;
            margin: 0 auto;
        }

        /* ── Header ── */
        .header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 32px;
            flex-wrap: wrap;
            gap: 16px;
        }

        .brand {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .brand-logo {
            width: 36px;
            height: 36px;
            background: linear-gradient(135deg, var(--blue), var(--cyan));
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
        }

        .brand-name {
            font-size: 1.3rem;
            font-weight: 700;
            background: linear-gradient(135deg, #fff 0%, #a1a1aa 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .brand-sub {
            font-size: 0.8rem;
            color: var(--muted);
            margin-top: 2px;
        }

        .header-right {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .stat-chip {
            font-family: 'Space Mono', monospace;
            font-size: 0.82rem;
            background: rgba(56, 217, 255, 0.06);
            border: 1px solid rgba(56, 217, 255, 0.18);
            color: var(--cyan);
            padding: 6px 14px;
            border-radius: 20px;
            white-space: nowrap;
        }

        .refresh-btn {
            background: rgba(74,124,255,0.08);
            border: 1px solid rgba(74,124,255,0.2);
            color: var(--blue);
            padding: 6px 14px;
            border-radius: 20px;
            font-size: 0.82rem;
            font-family: 'Outfit', sans-serif;
            cursor: pointer;
            text-decoration: none;
            transition: background 0.2s;
        }
        .refresh-btn:hover { background: rgba(74,124,255,0.16); }

        /* ── Stats Row ── */
        .stats-row {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 16px;
            margin-bottom: 28px;
        }

        .stat-card {
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: 14px;
            padding: 20px 24px;
            backdrop-filter: blur(16px);
        }

        .stat-label {
            font-size: 0.78rem;
            text-transform: uppercase;
            letter-spacing: 0.06em;
            color: var(--muted);
            margin-bottom: 8px;
        }

        .stat-value {
            font-family: 'Space Mono', monospace;
            font-size: 2rem;
            font-weight: 700;
            background: linear-gradient(135deg, var(--blue), var(--cyan));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        /* ── Table Card ── */
        .card {
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: 16px;
            backdrop-filter: blur(16px);
            overflow: hidden;
        }

        .card-header {
            padding: 20px 24px;
            border-bottom: 1px solid var(--border);
            font-size: 0.85rem;
            font-weight: 600;
            color: var(--subtle);
            letter-spacing: 0.04em;
            text-transform: uppercase;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .card-header::before {
            content: '';
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: var(--cyan);
            box-shadow: 0 0 8px var(--cyan);
            animation: pulse 2s infinite;
        }

        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.4; }
        }

        .table-wrap { overflow-x: auto; }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        thead th {
            padding: 14px 16px;
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.06em;
            color: var(--muted);
            font-weight: 600;
            text-align: left;
            border-bottom: 1px solid var(--border);
            white-space: nowrap;
        }

        .td-num { width: 52px; text-align: center; }

        .data-row td {
            padding: 14px 16px;
            border-bottom: 1px solid rgba(255,255,255,0.03);
            vertical-align: middle;
            transition: background 0.15s;
        }

        .data-row:last-child td { border-bottom: none; }
        .data-row:hover td { background: rgba(255,255,255,0.02); }

        .td-num { color: var(--muted); font-family: 'Space Mono', monospace; font-size: 0.8rem; }

        .name-cell {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .avatar {
            width: 32px;
            height: 32px;
            border-radius: 8px;
            background: linear-gradient(135deg, var(--blue), var(--purple));
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.75rem;
            font-weight: 700;
            color: #fff;
            flex-shrink: 0;
        }

        .email-chip {
            font-family: 'Space Mono', monospace;
            font-size: 0.82rem;
            color: var(--cyan);
            background: rgba(56,217,255,0.05);
            border: 1px solid rgba(56,217,255,0.12);
            padding: 3px 8px;
            border-radius: 6px;
            word-break: break-all;
        }

        .size-badge {
            font-size: 0.8rem;
            color: var(--subtle);
            background: rgba(255,255,255,0.04);
            border: 1px solid var(--border);
            padding: 3px 8px;
            border-radius: 6px;
        }

        .td-date {
            font-size: 0.8rem;
            color: var(--muted);
            white-space: nowrap;
        }

        .empty-state {
            padding: 60px 24px;
            text-align: center;
            color: var(--muted);
            font-size: 0.95rem;
        }

        .error-state { color: #f87171; }

        .footer {
            text-align: center;
            margin-top: 32px;
            font-size: 0.78rem;
            color: var(--muted);
        }

        .footer a { color: var(--blue); text-decoration: none; }
    </style>
</head>
<body>
<div class="wrapper">
    <div class="header">
        <div class="brand">
            <div class="brand-logo">🦌</div>
            <div>
                <div class="brand-name">raindeer.social</div>
                <div class="brand-sub">Waitlist Signups Dashboard</div>
            </div>
        </div>
        <div class="header-right">
            <span class="stat-chip">${totalCount} total signup${totalCount !== 1 ? 's' : ''}</span>
            <a href="/registration" class="refresh-btn">↻ Refresh</a>
        </div>
    </div>

    <div class="stats-row">
        <div class="stat-card">
            <div class="stat-label">Total Signups</div>
            <div class="stat-value">${totalCount}</div>
        </div>
        <div class="stat-card">
            <div class="stat-label">Today (IST)</div>
            <div class="stat-value">${registrations.filter(r => {
                const d = new Date(r.timestamp);
                const now = new Date();
                return d.toDateString() === now.toDateString();
            }).length}</div>
        </div>
        <div class="stat-card">
            <div class="stat-label">This Week</div>
            <div class="stat-value">${registrations.filter(r => {
                const d = new Date(r.timestamp);
                const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
                return d >= weekAgo;
            }).length}</div>
        </div>
    </div>

    <div class="card">
        <div class="card-header">Live Signups</div>
        <div class="table-wrap">
            <table>
                <thead>
                    <tr>
                        <th class="td-num">#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Company Size</th>
                        <th>Signed Up (IST)</th>
                    </tr>
                </thead>
                <tbody>
                    ${rowsHtml}
                </tbody>
            </table>
        </div>
    </div>

    <div class="footer">
        <a href="/">← Back to Landing Page</a> &nbsp;·&nbsp;
        <a href="/api/registrations">View Raw JSON</a>
    </div>
</div>
</body>
</html>`;

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(200).send(html);
}

function escapeHtml(str) {
    return String(str || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}
