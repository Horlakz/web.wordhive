import Storage from "@/utilities/storage";
import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig } from "axios";

const storage = new Storage();
const baseURL: string | undefined = process.env.NEXT_PUBLIC_API_URL;

export class Client {
  private api: AxiosInstance;

  constructor(url: string) {
    this.api = axios.create({});

    this.api.defaults.baseURL = `${baseURL}${url}`;
    this.api.defaults.xsrfHeaderName = "X-CSRFToken";
    this.api.defaults.responseEncoding = "utf8";
    this.api.defaults.headers["common"]["Content-Type"] = "application/json";
    this.api.defaults.headers["common"]["Cache-Control"] = "no-cache";
    this.api.defaults.headers["common"]["Pragma"] = "no-cache";
    this.api.defaults.headers["common"]["Expires"] = "0";

    this.api.interceptors.request.use(function (config) {
      config.headers.Authorization = `Bearer ${storage.getCookie("token")}`;
      return config;
    });
  }

  public new(config: AxiosRequestConfig) {
    return this.api(config);
  }
}
