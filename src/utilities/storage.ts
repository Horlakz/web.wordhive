import type { CookieValueTypes } from "cookies-next";
import { deleteCookie, getCookie, hasCookie, setCookie } from "cookies-next";

export default class Storage {
  private WEEK_IN_SECONDS = 604800;
  private TWO_DAYS_IN_SECONDS = 172800;
  private HALF_OF_A_DAY_IN_SECONDS = 43200;
  private isWindow: boolean = typeof window !== "undefined";

  setCookie(key: string, value: CookieValueTypes) {
    return setCookie(key, value, {
      maxAge: this.HALF_OF_A_DAY_IN_SECONDS,
    });
  }

  getCookie(key: string) {
    return getCookie(key);
  }

  checkCookie(key: string) {
    return hasCookie(key);
  }

  removeCookie(key: string) {
    return deleteCookie(key);
  }

  setLocalStorage(key: string, value: string) {
    this.isWindow && window.localStorage.setItem(key, value);
  }

  getLocalStorage(key: string) {
    return this.isWindow && window.localStorage.getItem(key);
  }

  checkLocalStorage(key: string) {
    return this.getLocalStorage(key) !== null;
  }

  removeLocalStorage(key: string) {
    this.isWindow && window.localStorage.removeItem(key);
  }
}
