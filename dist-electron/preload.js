"use strict";const n=require("electron");n.contextBridge.exposeInMainWorld("electronAPI",{onMainLog:e=>n.ipcRenderer.on("log",(o,r)=>e(r)),setWallpaper:e=>n.ipcRenderer.send("set-wallpaper",e)});
