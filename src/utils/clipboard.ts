/**
 * Cross-platform robust copy-to-clipboard utility.
 * Works seamlessly across:
 * - Desktop browsers (HTTPS and localhost)
 * - Mobile devices (iOS Safari, Android Chrome)
 * - Local network IP addresses over HTTP (e.g. http://192.168.1.9:5173) where navigator.clipboard is disabled by browser security policies
 */
export async function copyTextToClipboard(text: string): Promise<boolean> {
  // 1. Try modern Clipboard API if supported and in secure context
  if (navigator.clipboard && (window.isSecureContext || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fall through to fallback mechanism
    }
  }

  // 2. Reliable Fallback using textarea + execCommand('copy')
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    textArea.style.pointerEvents = 'none';
    textArea.setAttribute('readonly', '');

    document.body.appendChild(textArea);

    // Special selection handling for iOS Safari
    if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
      const range = document.createRange();
      range.selectNodeContents(textArea);
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
      }
      textArea.setSelectionRange(0, 999999);
    } else {
      textArea.select();
    }

    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch (err) {
    console.error('Copy to clipboard failed: ', err);
    return false;
  }
}
