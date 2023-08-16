import { Client } from "../apiClient";

export interface BlogData {
  title?: string;
  category?: { uuid: string; name: string } | string;
  body?: string;
}

export class BlogService extends Client {
  constructor() {
    super("/blog/");
  }

  listBlog() {
    return this.get("");
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
