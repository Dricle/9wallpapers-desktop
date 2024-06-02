import fs from 'node:fs'
import path from 'node:path'
import { app, BrowserWindow, ipcMain } from 'electron'
import { getWallpaper, setWallpaper, screens } from 'wallpaper'
import download from 'download'
import Store from 'electron-store'

if (process.platform === 'win32') {
    app.setAppUserModelId(app.getName())
}

let win

const cacheImgDir = path.join(app.getPath('appData'), 'img_cache')

function createWindow () {
    win = new BrowserWindow({
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    if (process.env.VITE_DEV_SERVER_URL) {
        win.loadURL(process.env.VITE_DEV_SERVER_URL)
        win.webContents.openDevTools()
    } else {
        win.loadFile(path.join(__dirname, '..', '.output/public', 'index.html'))
    }
}

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

app.whenReady().then(() => {
    createWindow()

    ipcMain.on('set-wallpaper', async function (e, { downloadUrl, fileName, wallpaperId }) {
        try {
            if (!fs.existsSync(cacheImgDir)) {
                fs.mkdirSync(cacheImgDir, { recursive: true })
            }

            fs.writeFileSync(cacheImgDir + '/' + fileName, await download(downloadUrl, cacheImgDir))
        } catch (error) {
            console.error(error)
            win.webContents.send('log', 'ERROR')
            win.webContents.send('log', error)
        }

        try {
            console.log('===========')
            console.log('SET WPP')
            console.log(fileName)
            console.log('===========')
            win.webContents.send('log', 'SET WPP OK')
            await setWallpaper(cacheImgDir + '/' + fileName)

            const store = new Store()
            store.delete('wallpaperId')
            store.set('wallpaperId', { wallpaperId })
        } catch (error) {
            console.error(error)
            win.webContents.send('log', 'ERROR')
            win.webContents.send('log', error)
        }

        fs.readdir(cacheImgDir, (err, files) => {
            if (err) {
                throw err
            }

            for (const file of files) {
                if (file !== fileName) {
                    fs.unlink(cacheImgDir + '/' + file, (error) => {
                        if (error) {
                            throw error
                        }
                    })
                }
            }
        })
    })

    ipcMain.on('get-wallpaper', async function () {
        const store = new Store()
        const wallpaperId = store.get('wallpaperId')
        if (wallpaperId) {
            win.webContents.send('get-wallpaper-id', wallpaperId)
        } else {
            const currentWallpaper = await getWallpaper()
            win.webContents.send('get-wallpaper', currentWallpaper)
        }
    })

    ipcMain.on('get-screens', async function () {
        const result = await screens()
        win.webContents.send('get-screens', result)
    })
})
