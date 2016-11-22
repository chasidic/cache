import { ICache } from './ICache';
export declare class MemoryCache implements ICache {
    private memory;
    clear(): Promise<void>;
    has(key: string): Promise<boolean>;
    remove(key: string): Promise<void>;
    get(key: string): Promise<string>;
    set(key: string, value: string): Promise<void>;
}
