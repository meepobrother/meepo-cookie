import { CookieOptionsArgs } from './cookie-options-args.model';
export declare class CookieOptions {
    path: string;
    domain: string;
    expires: string | Date;
    secure: boolean;
    constructor({path, domain, expires, secure}?: CookieOptionsArgs);
    merge(options?: CookieOptionsArgs): CookieOptions;
    private isPresent(obj);
}
export declare class BaseCookieOptions extends CookieOptions {
    private baseHref;
    constructor(baseHref: string);
}
