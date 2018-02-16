
import { BaseCookieOptions, CookieOptions } from './services/base-cookie-options';
import { CookieOptionsArgs } from './services/cookie-options-args.model';
import { CookieService } from './services/cookies.service';

export const ANGULAR2_COOKIE_PROVIDERS = [
    { provide: CookieOptions, useClass: BaseCookieOptions },
    { provide: CookieService, useFactory: cookieServiceFactory, deps: [CookieOptions] }
];

export function cookieServiceFactory(options: CookieOptions) {
    return new CookieService(options);
}

export { BaseCookieOptions, CookieOptions } from './services/base-cookie-options';
export { CookieOptionsArgs } from './services/cookie-options-args.model';
export { CookieService } from './services/cookies.service';
