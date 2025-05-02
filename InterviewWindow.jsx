// src/utils/openTestWindow.js

export default function openTestWindow(setTestWin) {
 
  // You can uncomment and use screen dimensions if you like:
  // const w = window.screen.width;
  // const h = window.screen.height;
  // const offscreenTop = -200;
  // const offscreenLeft = 200;

  const features = `top=50,left=100,width=800,height=600,resizable=no,scrollbars=yes`;
  const win = window.open('', '', features);

  if (!win) {
    alert('Popup blocked! Please allow popups for this site.');
    return null;
  }

  setTestWin(win);

  win.document.write(`
    <html>
      <head>
        <title>Interview In Progress</title>
        <style>
          body { font-family: sans-serif; text-align: center; padding: 2rem; }
          button { padding: 10px 20px; font-size: 18px; }
        </style>
      </head>
      <body>
        <h1>Interview In Progress</h1>
        <p>You cannot leave this window until the interview ends.</p>
        <button id="startFullscreenBtn">Start Fullscreen</button>
       <script src="/NewWin.js"></script>
      </body>
    </html>
  `);

  return win;
}
