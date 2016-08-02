"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const url_1 = require('url');
const path_1 = require('path');
const fs_extra_promise_1 = require('fs-extra-promise');
let CACHE_DIR = '/tmp/k-cache';
exports.setCacheDir = (cache_dir) => {
    CACHE_DIR = path_1.resolve(cache_dir);
};
class Cache {
    _normalize(key) {
        let parsed = url_1.parse(key);
        let hostname = parsed.hostname;
        let name = parsed.path && parsed.path !== '/' ? parsed.path : '/index';
        let base = path_1.basename(name);
        let ext = path_1.extname(name);
        let normalized = ext ?
            `${hostname}${path_1.dirname(name)}.${base}` :
            `${hostname}${name}.html`;
        return path_1.resolve(CACHE_DIR, normalized);
    }
    clear() {
        return __awaiter(this, void 0, void 0, function* () {
            yield fs_extra_promise_1.removeAsync(CACHE_DIR);
        });
    }
    has(key) {
        return __awaiter(this, void 0, void 0, function* () {
            let filepath = this._normalize(key);
            return yield fs_extra_promise_1.existsAsync(filepath);
        });
    }
    remove(key) {
        return __awaiter(this, void 0, void 0, function* () {
            let filepath = this._normalize(key);
            yield fs_extra_promise_1.removeAsync(filepath);
        });
    }
    get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            let filepath = this._normalize(key);
            let doesExists = yield fs_extra_promise_1.existsAsync(filepath);
            return doesExists ? yield fs_extra_promise_1.readFileAsync(filepath, { encoding: 'UTF-8' }) : null;
        });
    }
    set(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            let filepath = this._normalize(key);
            let dirpath = path_1.dirname(filepath);
            yield fs_extra_promise_1.ensureDirAsync(dirpath);
            yield fs_extra_promise_1.writeFileAsync(filepath, value, { encoding: 'UTF-8' });
        });
    }
}
exports.Cache = Cache;
