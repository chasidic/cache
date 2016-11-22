import { parse } from 'url';
import { ICache } from './ICache';

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

export class Cache implements ICache {

  constructor(private CACHE_DIR: string) { }

  private _normalize(key: string) {
    let parsed = parse(key);
    let hostname = parsed.hostname;
    let name = parsed.path && parsed.path !== '/' ? parsed.path : '/index';
    let base = basename(name);
    let ext = extname(name);

    let normalized = ext ?
      `${hostname}${dirname(name)}.${base}` :
      `${hostname}${name}.html`;

    return resolve(this.CACHE_DIR, normalized);
  }

  async clear() {
    await removeAsync(this.CACHE_DIR);
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
