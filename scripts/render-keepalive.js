/**
 * Render 24/7 Keep-Alive Daemon
 * 
 * Prevents Render.com free-tier web services from sleeping after 15 minutes of inactivity.
 * Pings the target URL every 10 minutes (600,000 ms).
 * 
 * Usage:
 *   node scripts/render-keepalive.js https://your-service.onrender.com
 *   or set environment variable:
 *   RENDER_SERVICE_URL=https://your-service.onrender.com node scripts/render-keepalive.js
 */

const targetUrl = process.argv[2] || process.env.RENDER_SERVICE_URL;

if (!targetUrl) {
  console.log('[Render Keep-Alive] Usage: node scripts/render-keepalive.js <YOUR_RENDER_URL>');
  console.log('[Render Keep-Alive] Example: node scripts/render-keepalive.js https://levlox-backend.onrender.com');
  process.exit(1);
}

const PING_INTERVAL_MS = 10 * 60 * 1000; // 10 minutes (Render sleeps at 15 mins)

async function ping() {
  const timestamp = new Date().toISOString();
  try {
    const res = await fetch(targetUrl);
    console.log(`[${timestamp}] PING SUCCESS: ${targetUrl} (Status: ${res.status})`);
  } catch (err) {
    console.error(`[${timestamp}] PING ERROR: ${targetUrl} - ${err.message}`);
  }
}

console.log(`[Render Keep-Alive] Active! Monitoring: ${targetUrl}`);
console.log(`[Render Keep-Alive] Pinging every ${PING_INTERVAL_MS / 60000} minutes to prevent sleep.`);

// Initial ping
ping();

// Recurring loop
setInterval(ping, PING_INTERVAL_MS);
