import { BrowserWindow }  from 'electron';
import osUtils            from 'os-utils';
import fs                 from 'fs';
import os                 from 'os';

const POLLING_INTERVAL = 500;

export function pollResources (mainWindow: BrowserWindow) {
  setInterval(async () => {
    const cpuUsage = await getCpuUsage();

    mainWindow.webContents.send("statistics", { cpuUsage });
  }, POLLING_INTERVAL);

  function getCpuUsage() {
    return new Promise((resolve) => {
      osUtils.cpuUsage(resolve);
    });
  }
}

export function getStaticData() {
  const totalStrorage = getStorageData().total;
  const cpuModel = os.cpus()[0].model;
  const totalMemGB =  Math.floor(osUtils.totalmem() / 1024);
  return {
    totalStrorage,
    cpuModel,
    totalMemGB,
  };
}

function getRamUsage() {
  return 1 - osUtils.freememPercentage();
}

function getStorageData() {
  const stats = fs.statfsSync(process.platform === 'win32' ? 'C:' : '/');
  const total = stats.bsize * stats.blocks;
  const free = stats.bsize * stats.bfree;

  return {
    total: Math.floor(total / 1_000_000_000),
    usage: 1 - free / total,
  }
}