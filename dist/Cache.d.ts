/// <reference types="bluebird" />
export declare let setCacheDir: (cache_dir: string) => void;
export declare class Cache {
    private _normalize(key);
    clear(): Promise<void>;
    has(key: string): Promise<boolean>;
    remove(key: string): Promise<void>;
    get(key: string): Promise<string>;
    set(key: string, value: string): Promise<void>;
}
