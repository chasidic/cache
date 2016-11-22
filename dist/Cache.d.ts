import { ICache } from './ICache';
export declare class Cache implements ICache {
    private CACHE_DIR;
    constructor(CACHE_DIR: string);
    private _normalize(key);
    clear(): Promise<void>;
    has(key: string): Promise<boolean>;
    remove(key: string): Promise<void>;
    get(key: string): Promise<string>;
    set(key: string, value: string): Promise<void>;
}
