(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('@angular/core')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/common', '@angular/core'], factory) :
	(factory((global['meepo-cookie'] = {}),global.ng.common,global.ng.core));
}(this, (function (exports,common,core) { 'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0
THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.
See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */
var extendStatics = Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
    function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var CookieOptions = /** @class */ (function () {
    /**
     * @param {?=} __0
     */
    function CookieOptions(_a) {
        var _b = _a === void 0 ? {} : _a, path = _b.path, domain = _b.domain, expires = _b.expires, secure = _b.secure;
        this.path = this.isPresent(path) ? path : null;
        this.domain = this.isPresent(domain) ? domain : null;
        this.expires = this.isPresent(expires) ? expires : null;
        this.secure = this.isPresent(secure) ? secure : false;
    }
    /**
     * @param {?=} options
     * @return {?}
     */
    CookieOptions.prototype.merge = function (options) {
        return new CookieOptions(/** @type {?} */ ({
            path: this.isPresent(options) && this.isPresent(options.path) ? options.path : this.path,
            domain: this.isPresent(options) && this.isPresent(options.domain) ? options.domain :
                this.domain,
            expires: this.isPresent(options) && this.isPresent(options.expires) ? options.expires :
                this.expires,
            secure: this.isPresent(options) && this.isPresent(options.secure) ? options.secure :
                this.secure,
        }));
    };
    /**
     * @param {?} obj
     * @return {?}
     */
    CookieOptions.prototype.isPresent = function (obj) {
        return obj !== undefined && obj !== null;
    };
    return CookieOptions;
}());
var BaseCookieOptions = /** @class */ (function (_super) {
    __extends(BaseCookieOptions, _super);
    /**
     * @param {?} baseHref
     */
    function BaseCookieOptions(baseHref) {
        var _this = _super.call(this, { path: baseHref || '/' }) || this;
        _this.baseHref = baseHref;
        return _this;
    }
    return BaseCookieOptions;
}(CookieOptions));
BaseCookieOptions.decorators = [
    { type: core.Injectable },
];
/** @nocollapse */
BaseCookieOptions.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: core.Optional }, { type: core.Inject, args: [common.APP_BASE_HREF,] },] },
]; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var CookieService = /** @class */ (function () {
    /**
     * @param {?=} _defaultOptions
     */
    function CookieService(_defaultOptions) {
        this._defaultOptions = _defaultOptions;
    }
    Object.defineProperty(CookieService.prototype, "cookieString", {
        /**
         * @return {?}
         */
        get: function () {
            return document.cookie || '';
        },
        /**
         * @param {?} val
         * @return {?}
         */
        set: function (val) {
            document.cookie = val;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} key
     * @return {?}
     */
    CookieService.prototype.get = function (key) {
        return ((this._cookieReader()))[key];
    };
    /**
     * @param {?} key
     * @return {?}
     */
    CookieService.prototype.getObject = function (key) {
        var /** @type {?} */ value = this.get(key);
        return value ? JSON.parse(value) : value;
    };
    /**
     * @return {?}
     */
    CookieService.prototype.getAll = function () {
        return /** @type {?} */ (this._cookieReader());
    };
    /**
     * @param {?} key
     * @param {?} value
     * @param {?=} options
     * @return {?}
     */
    CookieService.prototype.put = function (key, value, options) {
        this._cookieWriter()(key, value, options);
    };
    /**
     * @param {?} key
     * @param {?} value
     * @param {?=} options
     * @return {?}
     */
    CookieService.prototype.putObject = function (key, value, options) {
        this.put(key, JSON.stringify(value), options);
    };
    /**
     * @param {?} key
     * @param {?=} options
     * @return {?}
     */
    CookieService.prototype.remove = function (key, options) {
        this._cookieWriter()(key, undefined, options);
    };
    /**
     * @return {?}
     */
    CookieService.prototype.removeAll = function () {
        var _this = this;
        var /** @type {?} */ cookies = this.getAll();
        Object.keys(cookies).forEach(function (key) {
            _this.remove(key);
        });
    };
    /**
     * @return {?}
     */
    CookieService.prototype._cookieReader = function () {
        var /** @type {?} */ lastCookies = {};
        var /** @type {?} */ lastCookieString = '';
        var /** @type {?} */ that = this;
        var /** @type {?} */ cookieArray, /** @type {?} */ cookie, /** @type {?} */ i, /** @type {?} */ index, /** @type {?} */ name;
        var /** @type {?} */ currentCookieString = this.cookieString;
        if (currentCookieString !== lastCookieString) {
            lastCookieString = currentCookieString;
            cookieArray = lastCookieString.split('; ');
            lastCookies = {};
            for (i = 0; i < cookieArray.length; i++) {
                cookie = cookieArray[i];
                index = cookie.indexOf('=');
                if (index > 0) {
                    name = that._safeDecodeURIComponent(cookie.substring(0, index));
                    if (this.isBlank(((lastCookies))[name])) {
                        ((lastCookies))[name] = that._safeDecodeURIComponent(cookie.substring(index + 1));
                    }
                }
            }
        }
        return lastCookies;
    };
    /**
     * @return {?}
     */
    CookieService.prototype._cookieWriter = function () {
        var /** @type {?} */ that = this;
        return function (name, value, options) {
            that.cookieString = that._buildCookieString(name, value, options);
        };
    };
    /**
     * @param {?} str
     * @return {?}
     */
    CookieService.prototype._safeDecodeURIComponent = function (str) {
        try {
            return decodeURIComponent(str);
        }
        catch (e) {
            return str;
        }
    };
    /**
     * @param {?} name
     * @param {?} value
     * @param {?=} options
     * @return {?}
     */
    CookieService.prototype._buildCookieString = function (name, value, options) {
        var /** @type {?} */ cookiePath = '/';
        var /** @type {?} */ path, /** @type {?} */ expires;
        var /** @type {?} */ defaultOpts = this._defaultOptions || new CookieOptions(/** @type {?} */ ({ path: cookiePath }));
        var /** @type {?} */ opts = this._mergeOptions(defaultOpts, options);
        expires = opts.expires;
        if (this.isBlank(value)) {
            expires = 'Thu, 01 Jan 1970 00:00:00 GMT';
            value = '';
        }
        if (this.isString(expires)) {
            expires = new Date(expires);
        }
        var /** @type {?} */ str = encodeURIComponent(name) + '=' + encodeURIComponent(value);
        str += opts.path ? ';path=' + opts.path : '';
        str += opts.domain ? ';domain=' + opts.domain : '';
        str += expires ? ';expires=' + expires.toUTCString() : '';
        str += opts.secure ? ';secure' : '';
        var /** @type {?} */ cookieLength = str.length + 1;
        if (cookieLength > 4096) {
            console.log("Cookie '" + name + "' possibly not set or overflowed because it was too\n      large (" + cookieLength + " > 4096 bytes)!");
        }
        return str;
    };
    /**
     * @param {?} defaultOpts
     * @param {?=} providedOpts
     * @return {?}
     */
    CookieService.prototype._mergeOptions = function (defaultOpts, providedOpts) {
        var /** @type {?} */ newOpts = defaultOpts;
        if (this.isPresent(providedOpts)) {
            return newOpts.merge(new CookieOptions(providedOpts));
        }
        return newOpts;
    };
    /**
     * @param {?} obj
     * @return {?}
     */
    CookieService.prototype.isBlank = function (obj) {
        return obj === undefined || obj === null;
    };
    /**
     * @param {?} obj
     * @return {?}
     */
    CookieService.prototype.isPresent = function (obj) {
        return obj !== undefined && obj !== null;
    };
    /**
     * @param {?} obj
     * @return {?}
     */
    CookieService.prototype.isString = function (obj) {
        return typeof obj === 'string';
    };
    return CookieService;
}());
CookieService.decorators = [
    { type: core.Injectable },
];
/** @nocollapse */
CookieService.ctorParameters = function () { return [
    { type: CookieOptions, decorators: [{ type: core.Optional },] },
]; };
/**
 * @record
 */
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ANGULAR2_COOKIE_PROVIDERS = [
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

exports.ANGULAR2_COOKIE_PROVIDERS = ANGULAR2_COOKIE_PROVIDERS;
exports.cookieServiceFactory = cookieServiceFactory;
exports.BaseCookieOptions = BaseCookieOptions;
exports.CookieOptions = CookieOptions;
exports.CookieService = CookieService;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=meepo-cookie.umd.js.map
