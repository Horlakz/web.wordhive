import { Client } from "../apiClient";

export interface PortfolioFieldData {
  uuid: string;
  name: string;
}

export class PortfolioFieldService {
  private client: Client;

  constructor() {
    this.client = new Client("/portfolio-field");
  }

  async listPorfolioField() {
    return await this.client.get("");
  }

  async createPortfolioField(data: PortfolioFieldData) {
    return await this.client.post("", data);
  }

  async updatePortfolioField(id: string, data: PortfolioFieldData) {
    return await this.client.put(id, data);
  }

  async deletePortfolioField(id: string) {
    return await this.client.delete(id);
  }
}
