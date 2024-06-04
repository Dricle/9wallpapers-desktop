import { ipcRenderer, contextBridge } from 'electron'

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld('electronAPI', {
    on: (eventName, callback) => ipcRenderer.on(eventName, (_event, value) => callback(value)),

    // You can expose other APTs you need here.
    setToken: token => ipcRenderer.send('set-token', token),
    getToken: () => ipcRenderer.send('get-token'),
    setWallpaper: wallpaper => ipcRenderer.send('set-wallpaper', wallpaper),
    getWallpaper: () => ipcRenderer.send('get-wallpaper'),
    getScreens: () => ipcRenderer.send('get-screens'),
    startSchedule: settings => ipcRenderer.send('start-schedule', settings)
})
