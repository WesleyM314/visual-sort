const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

function createWindow()
{
	mainWindow = new BrowserWindow({
		width: 1024,
		height: 768,
		webPreferences: {
			nodeIntegration: true
		}
	});

	const startURL = process.env.ELECTRON_START_URL || url.format({
		pathname: path.join(__dirname, '/../build/index.html'),
		protocol: 'file:',
		slashes: true
	});
	
	// mainWindow.loadURL(process.env.ELECTRON_START_URL ? process.env.ELECTRON_START_URL : 'http://localhost:3000');
	mainWindow.loadURL(startURL);

	// mainWindow.webContents.openDevTools();

	mainWindow.on('closed', function ()
	{
		mainWindow = null;
	});
}

app.on('ready', createWindow);

app.on('window-all-closed', function ()
{
	if (process.platform !== 'darwin')
	{
		app.quit();
	}
});

app.on('activate', function ()
{
	if (mainWindow === null)
	{
		createWindow();
	}
})