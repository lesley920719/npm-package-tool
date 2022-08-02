import readline from 'readline';
import util from 'util';
import tomlJson from 'toml-json';
const config = tomlJson({ fileUrl: './config.toml' });
const exec = util.promisify(require('child_process').exec);
const choices = (config.packages ? config.packages : config as any).list.reverse();

/**
 * Get defaut command
 * @param {string}name
 * @param {boolean?}defaultTsc It add default tsc command, if defaultTsc is true
 */
const cmdGet = (name: string, defaultTsc?: boolean): string => {
  let cmd = `rimraf ./lib/${name}`;
  cmd = defaultTsc
    ? cmd + ` && tsc --outDir ./lib/${name}/ --declaration --skipLibCheck --allowSyntheticDefaultImports ./packages/${name}/index.ts`
    : cmd;
  cmd += ` && cp ./packages/${name}/package1.json ./lib/${name}/package.json`;
  cmd += ` && cp ./packages/${name}/README.md ./lib/${name}/README.md`;
  return cmd;
};

/**
 * build command array
 */
const buildCmdArr = [
  'webpack --config ./scripts/webpack.react-md.ts',
  cmdGet('rc-declaration-webpack-plugin', true),
  cmdGet('terminal-url-print', true),
];

const publishCmdGet = (name: string) => {
  return `cd ./lib/${name.slice(name.indexOf('\'') + 1, name.lastIndexOf('\''))}/ && npm publish --access public`;
};

let buildIndex = 0;
let comCount = choices.length;

/**
 * 0. build select
 * 1. whether to publish of select
 * 2. publish of select
 */
let step = 0;

const rl = readline.createInterface(process.stdin, process.stdout);

/**
 * select build or select publish print
 */
const selectBuildOrPublishPrint = () => {
  let str = step === 0 ? '\r\nSelect the components to build:\r\n' : '\r\nSelect the components to publish:\r\n';
  for (let i = 0; i < comCount; i++) {
    str += `${buildIndex === i ? '[√]' : '[ ]'} ${choices[i]}\r\n`;
  }
  process.stdout.write(str);
};

// print select of first
selectBuildOrPublishPrint();

process.stdin.on('keypress', (s: unknown, key: any): void => {
  const name = key.name;

  if (name === 'up' && buildIndex > 0) {
    buildIndex--;
  } else if (name === 'down' && buildIndex < comCount - 1) {
    buildIndex++;
  } else if (name === 'down' && buildIndex === comCount - 1) {
    buildIndex = 0;
  } else if (name === 'up' && buildIndex === 0) {
    buildIndex = comCount - 1;
  } else {
    return;
  }

  // Move the cursor to cover
  readline.moveCursor(process.stdout, 0, -comCount - 2);

  selectBuildOrPublishPrint();
});

const execCmd = async (cmd: string) => {
  const { stdout, stderr } = await exec(cmd);
  console.log(stderr === '' ? stdout : stderr);

  if (step === 2) {
    console.log('\r\n===================== exit\r\n');
    process.exit(0);
  } else {
    selectBuildOrPublishPrint();
  }
};

rl.on('line', () => {
  if (step === 0) {
    console.log(`${choices[buildIndex]} is building...`);
    execCmd(buildCmdArr[comCount - buildIndex - 1]);
    step++;
  } else if (step === 1) {
    console.log(`${choices[buildIndex]} is publish...`);
    step++;
    execCmd(publishCmdGet(choices[buildIndex]));
  }
}).on('close', () => {
  rl.close();
});