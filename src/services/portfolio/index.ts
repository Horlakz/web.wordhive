import { Client } from "../apiClient";
import { PortfolioFieldData } from "./field";
import { PortfolioGenreData } from "./genre";

export interface PortfolioData {
  title: string;
  body: string;
  image: string | File | null;
  genres: PortfolioGenreData[] | string[];
  field: PortfolioFieldData | string;
}

export class PortfolioService extends Client {
  constructor() {
    super("/portfolio");
  }

  async listPortfolios() {
    return await this.get("");
  }

  async createPortfolio(data: PortfolioData) {
    const { title, body } = data;
    const genre = data.genres as string[];
    const field = data.field as string;
    const image = data.image as File;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);
    formData.append("image", image);
    genre.forEach((g) => formData.append("genre", g));
    formData.append("field", field);

    return await this.post("", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  async updatePortfolio(id: string, data: PortfolioData) {
    return await this.put(id, data);
  }

  async deletePortfolio(id: string) {
    return await this.delete(id);
  }
}
