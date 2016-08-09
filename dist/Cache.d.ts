/// <reference types="bluebird" />
export declare class Cache {
    private CACHE_DIR;
    constructor(CACHE_DIR?: string);
    private _normalize(key);
    clear(): Promise<void>;
    has(key: string): Promise<boolean>;
    remove(key: string): Promise<void>;
    get(key: string): Promise<any>;
    set(key: string, value: string): Promise<void>;
}
