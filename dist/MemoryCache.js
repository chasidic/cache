"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
class MemoryCache {
    constructor() {
        this.memory = new Map();
    }
    clear() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.memory.clear();
        });
    }
    has(key) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.memory.has(key);
        });
    }
    remove(key) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.memory.delete(key);
        });
    }
    get(key) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.memory.get(key) || null;
        });
    }
    set(key, value) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.memory.set(key, value);
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
            yield this.set(key, JSON.stringify(value));
        });
    }
}
exports.MemoryCache = MemoryCache;
