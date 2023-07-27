import { Client } from "../apiClient";
import { PortfolioFieldData } from "./field";
import { PortfolioGenreData } from "./genre";

export interface PortfolioData {
  title: string;
  body: string;
  image: string;
  genre: PortfolioGenreData[];
  field: PortfolioFieldData;
}

export class PortfolioService extends Client {
  constructor() {
    super("/portfolio");
  }

  async listPortfolios() {
    return await this.get("");
  }

  async createPortfolio(data: PortfolioData) {
    return await this.post("", data);
  }

  async updatePortfolio(id: string, data: PortfolioData) {
    return await this.put(id, data);
  }

  async deletePortfolio(id: string) {
    return await this.delete(id);
  }
}
