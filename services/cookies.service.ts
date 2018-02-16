import { Injectable, Optional } from '@angular/core';

import { CookieOptions } from './base-cookie-options';
import { CookieOptionsArgs } from './cookie-options-args.model';

@Injectable()
export class CookieService implements ICookieService {
  protected get cookieString(): string {
    return document.cookie || '';
  }

  protected set cookieString(val: string) {
    document.cookie = val;
  }

  constructor(@Optional() private _defaultOptions?: CookieOptions) { }

  get(key: string): string {
    return (<any>this._cookieReader())[key];
  }

  getObject(key: string): Object {
    let value = this.get(key);
    return value ? JSON.parse(value) : value;
  }

  getAll(): Object {
    return <any>this._cookieReader();
  }

  put(key: string, value: string, options?: CookieOptionsArgs) {
    this._cookieWriter()(key, value, options);
  }

  putObject(key: string, value: Object, options?: CookieOptionsArgs) {
    this.put(key, JSON.stringify(value), options);
  }

  remove(key: string, options?: CookieOptionsArgs): void {
    this._cookieWriter()(key, undefined, options);
  }

  removeAll(): void {
    let cookies = this.getAll();
    Object.keys(cookies).forEach(key => {
      this.remove(key);
    });
  }

  private _cookieReader(): Object {
    let lastCookies = {};
    let lastCookieString = '';
    let that = this;

    let cookieArray: string[], cookie: string, i: number, index: number, name: string;
    let currentCookieString = this.cookieString;
    if (currentCookieString !== lastCookieString) {
      lastCookieString = currentCookieString;
      cookieArray = lastCookieString.split('; ');
      lastCookies = {};
      for (i = 0; i < cookieArray.length; i++) {
        cookie = cookieArray[i];
        index = cookie.indexOf('=');
        if (index > 0) {
          name = that._safeDecodeURIComponent(cookie.substring(0, index));
          if (this.isBlank((<any>lastCookies)[name])) {
            (<any>lastCookies)[name] = that._safeDecodeURIComponent(cookie.substring(index + 1));
          }
        }
      }
    }
    return lastCookies;
  }

  private _cookieWriter() {
    let that = this;

    return function (name: string, value: string, options?: CookieOptionsArgs) {
      that.cookieString = that._buildCookieString(name, value, options);
    };
  }

  private _safeDecodeURIComponent(str: string) {
    try {
      return decodeURIComponent(str);
    } catch (e) {
      return str;
    }
  }

  private _buildCookieString(name: string, value: string, options?: CookieOptionsArgs): string {
    let cookiePath = '/';
    let path: string, expires: any;
    let defaultOpts =
      this._defaultOptions || new CookieOptions(<CookieOptionsArgs>{ path: cookiePath });
    let opts: CookieOptions = this._mergeOptions(defaultOpts, options);
    expires = opts.expires;
    if (this.isBlank(value)) {
      expires = 'Thu, 01 Jan 1970 00:00:00 GMT';
      value = '';
    }
    if (this.isString(expires)) {
      expires = new Date(expires);
    }

    let str = encodeURIComponent(name) + '=' + encodeURIComponent(value);
    str += opts.path ? ';path=' + opts.path : '';
    str += opts.domain ? ';domain=' + opts.domain : '';
    str += expires ? ';expires=' + expires.toUTCString() : '';
    str += opts.secure ? ';secure' : '';

    let cookieLength = str.length + 1;
    if (cookieLength > 4096) {
      console.log(`Cookie \'${name}\' possibly not set or overflowed because it was too 
      large (${cookieLength} > 4096 bytes)!`);
    }
    return str;
  }

  private _mergeOptions(defaultOpts: CookieOptions, providedOpts?: CookieOptionsArgs):
    CookieOptions {
    let newOpts = defaultOpts;
    if (this.isPresent(providedOpts)) {
      return newOpts.merge(new CookieOptions(providedOpts));
    }
    return newOpts;
  }

  private isBlank(obj: any): boolean {
    return obj === undefined || obj === null;
  }

  private isPresent(obj: any): boolean {
    return obj !== undefined && obj !== null;
  }

  private isString(obj: any): obj is string {
    return typeof obj === 'string';
  }
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
