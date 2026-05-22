const { app, BrowserWindow, ipcMain, screen } = require('electron');
const path = require('path');

let mainWindow;
const WINDOW_SIZE = 150;

// --- AUTO START CONFIGURATION ---
app.setLoginItemSettings({
  openAtLogin: true,    
  openAsHidden: false,  
  path: app.getPath('exe') 
});

// Helper function to safely clamp window position across multiple monitors
function clampPosition(x, y) {
  // Dynamically fetch the display nearest to the target coordinates
  const currentDisplay = screen.getDisplayNearestPoint({ x: Math.round(x), y: Math.round(y) });
  const { x: boundsX, y: boundsY, width, height } = currentDisplay.workArea;

  // Restrict coordinates based on the active monitor's bounds
  const clampedX = Math.max(boundsX, Math.min(x, boundsX + width - WINDOW_SIZE));
  const clampedY = Math.max(boundsY, Math.min(y, boundsY + height - WINDOW_SIZE));

  return { x: clampedX, y: clampedY };
}

function createWindow() {
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height, x: boundsX, y: boundsY } = primaryDisplay.workArea;

  mainWindow = new BrowserWindow({
    width: WINDOW_SIZE,
    height: WINDOW_SIZE,
    icon: path.join(__dirname, 'ismet.ico'), 
    transparent: true,
    frame: false,
    resizable: false,
    alwaysOnTop: true,
    skipTaskbar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  mainWindow.loadFile('index.html');

  // Initial Position: Spawn on the bottom right of the primary display
  const initialX = boundsX + width - 300;
  const initialY = boundsY + height - WINDOW_SIZE - 20;
  const clamped = clampPosition(initialX, initialY);
  mainWindow.setPosition(clamped.x, clamped.y);
  
  mainWindow.setAlwaysOnTop(true, 'screen-saver');

  // Global Cursor Radar System (Mouse Tracking)
  setInterval(() => {
    if (mainWindow) {
      const mousePos = screen.getCursorScreenPoint();
      mainWindow.webContents.send('global-mouse-move', mousePos);
    }
  }, 50);
}

// Inter-Process Communication (IPC) Window Controls with Multi-Monitor Safeguards
ipcMain.on('move-window', (event, { x, y }) => {
  if (mainWindow) {
    const currentPos = mainWindow.getPosition();
    const targetX = currentPos[0] + x;
    const targetY = currentPos[1] + y;
    const clamped = clampPosition(targetX, targetY);
    mainWindow.setPosition(Math.round(clamped.x), Math.round(clamped.y));
  }
});

ipcMain.on('update-position', (event, { x, y }) => {
  if (mainWindow) {
    const clamped = clampPosition(x, y);
    mainWindow.setPosition(Math.round(clamped.x), Math.round(clamped.y));
  }
});

ipcMain.on('set-ignore-mouse', (event, ignore) => {
  if (mainWindow) mainWindow.setIgnoreMouseEvents(ignore, { forward: true });
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});