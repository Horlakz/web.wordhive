import { Client } from "../apiClient";

export class ApplicationService extends Client {
  constructor() {
    super("/service");
  }

  async listServices() {
    return await this.get("");
  }

//   async createPortfolio(data: PortfolioData) {
//     return await this.post("", data);
//   }

//   async updatePortfolio(id: string, data: PortfolioData) {
//     return await this.put(id, data);
//   }

//   async deletePortfolio(id: string) {
//     return await this.delete(id);
//   }
}
