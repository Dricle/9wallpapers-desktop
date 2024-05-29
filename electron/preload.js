import { ipcRenderer, contextBridge } from 'electron'

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld('electronAPI', {
    onMainLog: callback => ipcRenderer.on('log', (_event, value) => callback(value)),
    on: (eventName, callback) => ipcRenderer.on(eventName, (_event, value) => callback(value)),

    // You can expose other APTs you need here.
    setWallpaper: wallpaper => ipcRenderer.send('set-wallpaper', wallpaper),
    getWallpaper: () => ipcRenderer.send('get-wallpaper')
})
