import fs from 'node:fs'
import path from 'node:path'
import { app, BrowserWindow, ipcMain } from 'electron'
import { getWallpaper, setWallpaper } from 'wallpaper'
import download from 'download'

process.env.APP_ROOT = path.join(__dirname, '..')

export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, '.output/public')

process.env.VITE_PUBLIC = process.env.VITE_DEV_SERVER_URL
    ? path.join(process.env.APP_ROOT, 'public')
    : RENDERER_DIST

if (process.platform === 'win32')
    app.setAppUserModelId(app.getName())

let win

function createWindow () {
    win = new BrowserWindow({
        webPreferences: {
            preload: path.join(MAIN_DIST, 'preload.js')
        }
    })

    if (process.env.VITE_DEV_SERVER_URL) {
        win.loadURL(process.env.VITE_DEV_SERVER_URL)
        win.webContents.openDevTools()
    } else {
        win.loadFile(path.join(process.env.VITE_PUBLIC, 'index.html'))
    }
}

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

app.whenReady().then(() => {
    createWindow()

    ipcMain.on('set-wallpaper', async function (e, { downloadUrl, fileName }) {
        const storagePath = 'storage/9wpp'

        if (!fs.existsSync(storagePath)) {
            fs.mkdirSync(storagePath, { recursive: true })
        }

        fs.writeFileSync(storagePath + '/' + fileName, await download(downloadUrl, storagePath))

        try {
            console.log('===========')
            console.log('SET WPP')
            console.log(fileName)
            console.log('===========')
            await setWallpaper(storagePath + '/' + fileName)
        } catch (error) {
            console.error(error)
        }

        fs.readdir(storagePath, (err, files) => {
            if (err) {
                throw err
            }

            for (const file of files) {
                if (file !== fileName) {
                    fs.unlink(storagePath + '/' + file, (error) => {
                        if (error) {
                            throw error
                        }
                    })
                }
            }
        })
    })
})
