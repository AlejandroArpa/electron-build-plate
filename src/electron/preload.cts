import * as electron from 'electron';

electron.contextBridge.exposeInMainWorld('electron', {
  subscribeStatistics: (callback: (statistics: Statistics  ) =>void) => {
    // @ts-ignore
    electron.ipcRenderer.on('statistics', (_, stats) => {
      callback(stats);
    })
    // @ts-ignore
    electron.ipcRenderer.off('statistics', (_, stats) => {
      callback(stats);
    });
  },
  getStaticData:() => electron.ipcRenderer.invoke("getStaticData"),
} satisfies Window['electron']
);
