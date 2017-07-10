"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MemoryCache {
    constructor() {
        this.memory = new Map();
    }
    async clear() {
        this.memory.clear();
    }
    async has(key) {
        return this.memory.has(key);
    }
    async remove(key) {
        this.memory.delete(key);
    }
    async get(key) {
        return this.memory.get(key) || null;
    }
    async set(key, value) {
        this.memory.set(key, value);
    }
    async getJSON(key) {
        const val = await this.get(key);
        return val != null ? JSON.parse(val) : null;
    }
    async setJSON(key, value) {
        await this.set(key, JSON.stringify(value));
    }
}
exports.MemoryCache = MemoryCache;
