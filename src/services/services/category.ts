import { Client } from "../apiClient";

export interface ServiceCategoryData {
  name: string;
  uuid?: string;
}

export class ApplicationServiceCategory extends Client {
  constructor() {
    super("/service-category");
  }

  async listServiceCategories() {
    return await this.get("");
  }

  async createServiceCategory(data: ServiceCategoryData) {
    return await this.post("", data);
  }

  async updateServiceCategory(id: string, data: ServiceCategoryData) {
    return await this.patch(id, data);
  }

  async deleteServiceCategory(id: string) {
    return await this.delete(id);
  }
}
