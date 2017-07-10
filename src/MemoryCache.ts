export class MemoryCache {

  private memory = new Map<string, string>();

  async clear() {
    this.memory.clear();
  }

  async has(key: string) {
    return this.memory.has(key);
  }

  async remove(key: string) {
    this.memory.delete(key);
  }

  async get(key: string) {
    return this.memory.get(key) || null;
  }

  async set(key: string, value: string) {
    this.memory.set(key, value);
  }

  async getJSON<T>(key: string) {
    const val = await this.get(key);
    return val != null ? <T> JSON.parse(val) : null;
  }

  async setJSON<T>(key: string, value: T) {
    await this.set(key, JSON.stringify(value));
  }
}
