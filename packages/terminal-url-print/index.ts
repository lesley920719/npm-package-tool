import os = require('os');
import boxen = require('boxen');
import chalk = require('chalk');
import { write } from 'clipboardy';

/**
 * Get localhost ip host address
 */
 const getIpHost = (): string => {
  /**os.networkInterfaces() 返回一个对象，该对象包含已分配了网络地址的网络接口 */
  const interfaces = os.networkInterfaces();
  for (const devName in interfaces) {
    const iface = interfaces[devName] as os.NetworkInterfaceInfo[];
    for (let i = 0; i < iface.length; i++) {
      const alias = iface[i];
      if (
        alias.family === "IPv4" &&
        alias.address !== "127.0.0.1" &&
        !alias.internal
      ) {
        return alias.address;
      }
    }
  }
  return '';
}
const ipHost = getIpHost();

/**
 * Print and copy server url
 * @param port localhost port
 * @param copyType 'localhost' | 'ip' | 'none'
 */
const terminalUrlPrint = async (info:{port: string, copyType?: 'localhost' | 'ip' | 'none'}): Promise<void> => {
  const {port, copyType} = info
  const error = (message: string) => chalk`{red ERROR:} ${message}`;

  const localAddress = `http://localhost:${port}`;
  const ipAddress = `http://${ipHost}:${port}`;
  let message = chalk.green('You can now view');
  message += `\n\n${chalk.bold(`- Local:`)}            ${localAddress}`;
  message += `\n${chalk.bold(`- On Your Network:`)} ${ipAddress}`;

  try {
    if (copyType !== 'none'){
      await write(copyType === 'localhost' ? localAddress : ipAddress);
      message += `\n\n${chalk.grey(`Copied ${copyType === 'localhost' ? 'Local' : 'IP'} url to clipboard!`)}`;
    }
  } catch (err) {
    console.error(error(`Cannot copy to clipboard: ${JSON.stringify(err)}`));
  }
  console.log(
    boxen(message, {
      padding: 1,
      borderColor: 'green',
      margin: 1,
    })
  );
};

export default terminalUrlPrint;
