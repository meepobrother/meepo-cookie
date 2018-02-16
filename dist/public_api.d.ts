import { BaseCookieOptions, CookieOptions } from './services/base-cookie-options';
import { CookieService } from './services/cookies.service';
export declare const ANGULAR2_COOKIE_PROVIDERS: ({
    provide: typeof CookieOptions;
    useClass: typeof BaseCookieOptions;
} | {
    provide: typeof CookieService;
    useFactory: (options: CookieOptions) => CookieService;
    deps: (typeof CookieOptions)[];
})[];
export declare function cookieServiceFactory(options: CookieOptions): CookieService;
export { BaseCookieOptions, CookieOptions } from './services/base-cookie-options';
export { CookieOptionsArgs } from './services/cookie-options-args.model';
export { CookieService } from './services/cookies.service';
