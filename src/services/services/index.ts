import { Client } from "../apiClient";

export interface ServiceQuality {
  type: string;
  price: number;
}

export interface ServiceVolume {
  name: string;
  qualities: ServiceQuality[];
}

export interface ServiceData {
  title: string;
  body: string;
  icon: string;
  category: string;
  volumes: ServiceVolume[];
}

export class ApplicationService extends Client {
  constructor() {
    super("/service");
  }

  async listServices(category: string, name: string, page = 1) {
    return await this.get("", { params: { category, name, page, limit: 10 } });
  }

  async createService(data: ServiceData) {
    return await this.post("", data);
  }

  async deleteService(id: string) {
    return await this.delete(id);
  }
}
