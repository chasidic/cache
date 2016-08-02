import { parse } from 'url';

import {
  resolve,
  dirname,
  extname,
  basename
} from 'path';

import {
  ensureDirAsync,
  removeAsync,
  existsAsync,
  readFileAsync,
  writeFileAsync
} from 'fs-extra-promise';

let CACHE_DIR = '/tmp/k-cache';

export let setCacheDir = (cache_dir: string) => {
  CACHE_DIR = resolve(cache_dir);
};

export class Cache {

  private _normalize(key: string) {
    let parsed = parse(key);
    let hostname = parsed.hostname;
    let name = parsed.path && parsed.path !== '/' ? parsed.path : '/index';
    let base = basename(name);
    let ext = extname(name);

    let normalized = ext ?
      `${ hostname }${ dirname(name) }.${ base }` :
      `${ hostname }${ name }.html`;

    return resolve(CACHE_DIR, normalized);
  }

  async clear() {
    await removeAsync(CACHE_DIR);
  }

  async has(key: string) {
    let filepath = this._normalize(key);
    return await existsAsync(filepath);
  }

  async remove(key: string) {
    let filepath = this._normalize(key);
    await removeAsync(filepath);
  }

  async get(key: string) {
    let filepath = this._normalize(key);
    let doesExists = await existsAsync(filepath);
    return doesExists ? await readFileAsync(filepath, { encoding: 'UTF-8' }) : null;
  }

  async set(key: string, value: string) {
    let filepath = this._normalize(key);
    let dirpath = dirname(filepath);
    await ensureDirAsync(dirpath);
    await writeFileAsync(filepath, value, { encoding: 'UTF-8' });
  }
}
