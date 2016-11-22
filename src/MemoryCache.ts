import { ICache } from './ICache';

export class MemoryCache implements ICache  {

  private memory = new Map<string,string>();

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
}
