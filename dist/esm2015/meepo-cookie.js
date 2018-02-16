import { APP_BASE_HREF } from '@angular/common';
import { Inject, Injectable, Optional } from '@angular/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class CookieOptions {
    /**
     * @param {?=} __0
     */
    constructor({ path, domain, expires, secure } = {}) {
        this.path = this.isPresent(path) ? path : null;
        this.domain = this.isPresent(domain) ? domain : null;
        this.expires = this.isPresent(expires) ? expires : null;
        this.secure = this.isPresent(secure) ? secure : false;
    }
    /**
     * @param {?=} options
     * @return {?}
     */
    merge(options) {
        return new CookieOptions(/** @type {?} */ ({
            path: this.isPresent(options) && this.isPresent(options.path) ? options.path : this.path,
            domain: this.isPresent(options) && this.isPresent(options.domain) ? options.domain :
                this.domain,
            expires: this.isPresent(options) && this.isPresent(options.expires) ? options.expires :
                this.expires,
            secure: this.isPresent(options) && this.isPresent(options.secure) ? options.secure :
                this.secure,
        }));
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    isPresent(obj) {
        return obj !== undefined && obj !== null;
    }
}
class BaseCookieOptions extends CookieOptions {
    /**
     * @param {?} baseHref
     */
    constructor(baseHref) {
        super({ path: baseHref || '/' });
        this.baseHref = baseHref;
    }
}
BaseCookieOptions.decorators = [
    { type: Injectable },
];
/** @nocollapse */
BaseCookieOptions.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [APP_BASE_HREF,] },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class CookieService {
    /**
     * @param {?=} _defaultOptions
     */
    constructor(_defaultOptions) {
        this._defaultOptions = _defaultOptions;
    }
    /**
     * @return {?}
     */
    get cookieString() {
        return document.cookie || '';
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set cookieString(val) {
        document.cookie = val;
    }
    /**
     * @param {?} key
     * @return {?}
     */
    get(key) {
        return (/** @type {?} */ (this._cookieReader()))[key];
    }
    /**
     * @param {?} key
     * @return {?}
     */
    getObject(key) {
        let /** @type {?} */ value = this.get(key);
        return value ? JSON.parse(value) : value;
    }
    /**
     * @return {?}
     */
    getAll() {
        return /** @type {?} */ (this._cookieReader());
    }
    /**
     * @param {?} key
     * @param {?} value
     * @param {?=} options
     * @return {?}
     */
    put(key, value, options) {
        this._cookieWriter()(key, value, options);
    }
    /**
     * @param {?} key
     * @param {?} value
     * @param {?=} options
     * @return {?}
     */
    putObject(key, value, options) {
        this.put(key, JSON.stringify(value), options);
    }
    /**
     * @param {?} key
     * @param {?=} options
     * @return {?}
     */
    remove(key, options) {
        this._cookieWriter()(key, undefined, options);
    }
    /**
     * @return {?}
     */
    removeAll() {
        let /** @type {?} */ cookies = this.getAll();
        Object.keys(cookies).forEach(key => {
            this.remove(key);
        });
    }
    /**
     * @return {?}
     */
    _cookieReader() {
        let /** @type {?} */ lastCookies = {};
        let /** @type {?} */ lastCookieString = '';
        let /** @type {?} */ that = this;
        let /** @type {?} */ cookieArray, /** @type {?} */ cookie, /** @type {?} */ i, /** @type {?} */ index, /** @type {?} */ name;
        let /** @type {?} */ currentCookieString = this.cookieString;
        if (currentCookieString !== lastCookieString) {
            lastCookieString = currentCookieString;
            cookieArray = lastCookieString.split('; ');
            lastCookies = {};
            for (i = 0; i < cookieArray.length; i++) {
                cookie = cookieArray[i];
                index = cookie.indexOf('=');
                if (index > 0) {
                    name = that._safeDecodeURIComponent(cookie.substring(0, index));
                    if (this.isBlank((/** @type {?} */ (lastCookies))[name])) {
                        (/** @type {?} */ (lastCookies))[name] = that._safeDecodeURIComponent(cookie.substring(index + 1));
                    }
                }
            }
        }
        return lastCookies;
    }
    /**
     * @return {?}
     */
    _cookieWriter() {
        let /** @type {?} */ that = this;
        return function (name, value, options) {
            that.cookieString = that._buildCookieString(name, value, options);
        };
    }
    /**
     * @param {?} str
     * @return {?}
     */
    _safeDecodeURIComponent(str) {
        try {
            return decodeURIComponent(str);
        }
        catch (/** @type {?} */ e) {
            return str;
        }
    }
    /**
     * @param {?} name
     * @param {?} value
     * @param {?=} options
     * @return {?}
     */
    _buildCookieString(name, value, options) {
        let /** @type {?} */ cookiePath = '/';
        let /** @type {?} */ path, /** @type {?} */ expires;
        let /** @type {?} */ defaultOpts = this._defaultOptions || new CookieOptions(/** @type {?} */ ({ path: cookiePath }));
        let /** @type {?} */ opts = this._mergeOptions(defaultOpts, options);
        expires = opts.expires;
        if (this.isBlank(value)) {
            expires = 'Thu, 01 Jan 1970 00:00:00 GMT';
            value = '';
        }
        if (this.isString(expires)) {
            expires = new Date(expires);
        }
        let /** @type {?} */ str = encodeURIComponent(name) + '=' + encodeURIComponent(value);
        str += opts.path ? ';path=' + opts.path : '';
        str += opts.domain ? ';domain=' + opts.domain : '';
        str += expires ? ';expires=' + expires.toUTCString() : '';
        str += opts.secure ? ';secure' : '';
        let /** @type {?} */ cookieLength = str.length + 1;
        if (cookieLength > 4096) {
            console.log(`Cookie \'${name}\' possibly not set or overflowed because it was too
      large (${cookieLength} > 4096 bytes)!`);
        }
        return str;
    }
    /**
     * @param {?} defaultOpts
     * @param {?=} providedOpts
     * @return {?}
     */
    _mergeOptions(defaultOpts, providedOpts) {
        let /** @type {?} */ newOpts = defaultOpts;
        if (this.isPresent(providedOpts)) {
            return newOpts.merge(new CookieOptions(providedOpts));
        }
        return newOpts;
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    isBlank(obj) {
        return obj === undefined || obj === null;
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    isPresent(obj) {
        return obj !== undefined && obj !== null;
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    isString(obj) {
        return typeof obj === 'string';
    }
}
CookieService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
CookieService.ctorParameters = () => [
    { type: CookieOptions, decorators: [{ type: Optional },] },
];
/**
 * @record
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const ANGULAR2_COOKIE_PROVIDERS = [
    { provide: CookieOptions, useClass: BaseCookieOptions },
    { provide: CookieService, useFactory: cookieServiceFactory, deps: [CookieOptions] }
];
/**
 * @param {?} options
 * @return {?}
 */
function cookieServiceFactory(options) {
    return new CookieService(options);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */

export { ANGULAR2_COOKIE_PROVIDERS, cookieServiceFactory, BaseCookieOptions, CookieOptions, CookieService };
//# sourceMappingURL=meepo-cookie.js.map
