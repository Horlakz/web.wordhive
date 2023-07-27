import { Client } from "../apiClient";

export interface BlogCommentData {
  fullname: string;
  message: string;
}

export class BlogCommentService extends Client {
  constructor() {
    super("/blog-comment/");
  }

  listBlogComment(slug: string) {
    return this.get(slug);
  }

  createBlogComment(slug: string, data: BlogCommentData) {
    return this.post<BlogCommentData>(slug, data);
  }
}
