"use strict";
const tslib_1 = require("tslib");
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
    clear() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield fs_extra_promise_1.removeAsync(this.CACHE_DIR);
        });
    }
    has(key) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let filepath = this._normalize(key);
            return yield fs_extra_promise_1.existsAsync(filepath);
        });
    }
    remove(key) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let filepath = this._normalize(key);
            yield fs_extra_promise_1.removeAsync(filepath);
        });
    }
    get(key) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let filepath = this._normalize(key);
            let doesExists = yield fs_extra_promise_1.existsAsync(filepath);
            return doesExists ? yield fs_extra_promise_1.readFileAsync(filepath, { encoding: 'UTF-8' }) : null;
        });
    }
    set(key, value) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let filepath = this._normalize(key);
            let dirpath = path_1.dirname(filepath);
            yield fs_extra_promise_1.ensureDirAsync(dirpath);
            yield fs_extra_promise_1.writeFileAsync(filepath, value, { encoding: 'UTF-8' });
        });
    }
    getJSON(key) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const val = yield this.get(key);
            return val != null ? JSON.parse(val) : null;
        });
    }
    setJSON(key, value) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.set(key, JSON.stringify(value, null, 2));
        });
    }
}
exports.Cache = Cache;
