import { Client } from "../apiClient";

export interface PortfolioGenreData {
  uuid: string;
  name: string;
}

export class PortfolioGenreService {
  private client: Client;

  constructor() {
    this.client = new Client("/portfolio-genres");
  }

  async listPorfolioGenres() {
    return await this.client.get("");
  }

  async createPortfolioGenre(data: PortfolioGenreData) {
    return await this.client.post("", data);
  }

  async updatePortfolioGenre(id: string, data: PortfolioGenreData) {
    return await this.client.put(id, data);
  }

  async deletePortfolioGenre(id: string) {
    return await this.client.delete(id);
  }
}
