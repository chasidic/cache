"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const url_1 = require("url");
const path_1 = require("path");
const fs_extra_promise_1 = require("fs-extra-promise");
class Cache {
    constructor(CACHE_DIR, extension = 'html') {
        this.CACHE_DIR = CACHE_DIR;
        this.extension = extension;
    }
    _normalize(key) {
        let parsed = url_1.parse(key);
        let hostname = parsed.hostname || '';
        let name = parsed.path && parsed.path !== '/' ? parsed.path : '/index';
        let base = path_1.basename(name);
        let ext = path_1.extname(name);
        let normalized = ext ?
            `${hostname}${path_1.dirname(name)}.${base}` :
            `${hostname}${name}.${this.extension}`;
        return path_1.resolve(this.CACHE_DIR, normalized);
    }
    async clear() {
        await fs_extra_promise_1.removeAsync(this.CACHE_DIR);
    }
    async has(key) {
        let filepath = this._normalize(key);
        return await fs_extra_promise_1.existsAsync(filepath);
    }
    async remove(key) {
        let filepath = this._normalize(key);
        await fs_extra_promise_1.removeAsync(filepath);
    }
    async get(key) {
        let filepath = this._normalize(key);
        let doesExists = await fs_extra_promise_1.existsAsync(filepath);
        return doesExists ? await fs_extra_promise_1.readFileAsync(filepath, { encoding: 'UTF-8' }) : null;
    }
    async set(key, value) {
        let filepath = this._normalize(key);
        let dirpath = path_1.dirname(filepath);
        await fs_extra_promise_1.ensureDirAsync(dirpath);
        await fs_extra_promise_1.writeFileAsync(filepath, value, { encoding: 'UTF-8' });
    }
    async getJSON(key) {
        const val = await this.get(key);
        return val != null ? JSON.parse(val) : null;
    }
    async setJSON(key, value) {
        await this.set(key, JSON.stringify(value, null, 2));
    }
}
exports.Cache = Cache;
