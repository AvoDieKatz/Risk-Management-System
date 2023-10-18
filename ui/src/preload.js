const { contextBridge, ipcRenderer } = require("electron");
const { channels } = require("./shared/constants");

const electronHandler = {
    ipcRenderer: {
        sendMessage: (channel, ...args) => {
            ipcRenderer.send(channels.IPC, ...args);
        },
        on: (channel, func) => {
            const subscription = (_event, ...args) => func(...args);
            ipcRenderer.on(channels.IPC, subscription);
            return () => {
                ipcRenderer.removeListener(channels.IPC, subscription);
            };
        },
        once: (channel, func) => {
            ipcRenderer.once(channels.IPC, (_event, ...args) => func(...args));
        },
    },
};

// contextBridge.exposeInMainWorld("electron", electronHandler);