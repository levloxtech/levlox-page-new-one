/**
 * In-browser silent keep-alive pinger for Render.com backends.
 * If VITE_RENDER_SERVICE_URL is defined, pings the backend every 12 minutes to keep it active.
 */
export function initRenderKeepAlive() {
  const renderUrl = import.meta.env.VITE_RENDER_SERVICE_URL;
  if (!renderUrl) return;

  const PING_INTERVAL = 12 * 60 * 1000; // 12 minutes

  const ping = () => {
    fetch(renderUrl, { mode: 'no-cors' }).catch(() => {
      // Silent error handler
    });
  };

  // Initial ping after 5 seconds of page load
  setTimeout(ping, 5000);

  // Interval ping
  setInterval(ping, PING_INTERVAL);
}
