import { ICache } from './ICache';
export declare class Cache<T> implements ICache {
    private CACHE_DIR;
    private extension;
    constructor(CACHE_DIR: string, extension?: string);
    private _normalize(key);
    clear(): Promise<void>;
    has(key: string): Promise<boolean>;
    remove(key: string): Promise<void>;
    get(key: string): Promise<string | null>;
    set(key: string, value: string): Promise<void>;
    getJSON<T>(key: string): Promise<T | null>;
    setJSON<T>(key: string, value: T): Promise<void>;
}
