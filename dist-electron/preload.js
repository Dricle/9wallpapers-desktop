"use strict";const e=require("electron");e.contextBridge.exposeInMainWorld("electronAPI",{on:(n,t)=>e.ipcRenderer.on(n,(s,r)=>t(r)),setToken:n=>e.ipcRenderer.send("set-token",n),getToken:()=>e.ipcRenderer.send("get-token"),setSettings:n=>e.ipcRenderer.send("set-settings",n),getSettings:()=>e.ipcRenderer.send("get-settings"),setWallpaper:n=>e.ipcRenderer.send("set-wallpaper",n),getWallpaper:()=>e.ipcRenderer.send("get-wallpaper"),getScreens:()=>e.ipcRenderer.send("get-screens"),startSchedule:n=>e.ipcRenderer.send("start-schedule",n)});
