import { CookieOptions } from './base-cookie-options';
import { CookieOptionsArgs } from './cookie-options-args.model';
export declare class CookieService implements ICookieService {
    private _defaultOptions;
    protected cookieString: string;
    constructor(_defaultOptions?: CookieOptions);
    get(key: string): string;
    getObject(key: string): Object;
    getAll(): Object;
    put(key: string, value: string, options?: CookieOptionsArgs): void;
    putObject(key: string, value: Object, options?: CookieOptionsArgs): void;
    remove(key: string, options?: CookieOptionsArgs): void;
    removeAll(): void;
    private _cookieReader();
    private _cookieWriter();
    private _safeDecodeURIComponent(str);
    private _buildCookieString(name, value, options?);
    private _mergeOptions(defaultOpts, providedOpts?);
    private isBlank(obj);
    private isPresent(obj);
    private isString(obj);
}
export interface ICookieService {
    get(key: string): string;
    getObject(key: string): Object;
    getAll(): Object;
    put(key: string, value: string, options?: CookieOptionsArgs): void;
    putObject(key: string, value: Object, options?: CookieOptionsArgs): void;
    remove(key: string, options?: CookieOptionsArgs): void;
    removeAll(): void;
}
