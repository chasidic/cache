export interface ICache {
    clear(): Promise<void>;
    has(key: string): Promise<boolean>;
    remove(key: string): Promise<void>;
    get(key: string): Promise<string>;
    set(key: string, value: string): Promise<void>;
    getJSON<T>(key: string): Promise<T>;
    setJSON<T>(key: string, value: T): Promise<void>;
}
