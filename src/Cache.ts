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

export class Cache<T> implements ICache {

  constructor(private CACHE_DIR: string, private extension = 'html') { }

  private _normalize(key: string) {
    let parsed = parse(key);
    let hostname = parsed.hostname || '';
    let name = parsed.path && parsed.path !== '/' ? parsed.path : '/index';
    let base = basename(name);
    let ext = extname(name);

    let normalized = ext ?
      `${hostname}${dirname(name)}.${base}` :
      `${hostname}${name}.${this.extension}`;

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

  async getJSON<T>(key: string) {
    const val = await this.get(key);
    return val != null ? <T> JSON.parse(val) : null;
  }

  async setJSON<T>(key: string, value: T) {
    await this.set(key, JSON.stringify(value, null, 2));
  }
}
