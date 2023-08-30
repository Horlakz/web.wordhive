import { Client } from "../apiClient";

export interface BlogData {
  title?: string;
  category?: { uuid: string; name: string } | string;
  body?: string;
}

export interface BlogAPIParams {
  category: string;
  search: string;
  page: number;
  limit: number;
}

export class BlogService extends Client {
  constructor() {
    super("/blog/");
  }

  listBlog(params: Partial<BlogAPIParams> = { limit: 10 }) {
    return this.get("", { params });
  }
  getBlog(slug: string) {
    return this.get(slug);
  }

  createBlog(data: BlogData) {
    return this.post<BlogData>("", data);
  }

  updateBlog(slug: string, data: BlogData) {
    return this.patch<BlogData>(slug, data);
  }

  deleteBlog(slug: string) {
    return this.delete(slug);
  }
}
