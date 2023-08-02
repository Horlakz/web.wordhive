import Storage from "@/utilities/storage";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export class Client extends Storage {
  private api: AxiosInstance;
  private baseURL: string | undefined = process.env.NEXT_PUBLIC_API_URL;

  constructor(url: string) {
    super();
    this.api = axios.create({
      baseURL: `${this.baseURL}${url}`,
      xsrfHeaderName: "X-CSRFToken",
      responseEncoding: "utf8",
      headers: { "Content-Type": "application/json" },
    });

    this.api.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${this.getCookie("access")}`;
      return config;
    });
  }

  custom(config: AxiosRequestConfig) {
    return this.api(config);
  }

  get(url: string, config?: AxiosRequestConfig) {
    return this.custom({ method: "get", url, ...config });
  }

  post<T>(url: string, data?: T, config?: AxiosRequestConfig) {
    return this.custom({ method: "post", url, data, ...config });
  }

  put<T>(url: string, data?: T, config?: AxiosRequestConfig) {
    return this.custom({ method: "put", url, data, ...config });
  }

  patch<T>(url: string, data?: T, config?: AxiosRequestConfig) {
    return this.custom({ method: "patch", url, data, ...config });
  }

  delete(url: string, config?: AxiosRequestConfig) {
    return this.custom({ method: "delete", url, ...config });
  }
}
