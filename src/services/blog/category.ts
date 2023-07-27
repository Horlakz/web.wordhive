import { Client } from "../apiClient";

export interface BlogCategoryData {
  name: string;
}

export class BlogCategoryService extends Client {
  constructor() {
    super("/blog-category/");
  }

  listBlogCategory() {
    return this.get("");
  }

  createBlogCategory(data: BlogCategoryData) {
    return this.post<BlogCategoryData>("", data);
  }

  updateBlogCategory(id: string, data: BlogCategoryData) {
    return this.patch<BlogCategoryData>(id, data);
  }

  deleteBlogCategory(id: string) {
    return this.delete(id);
  }
}
