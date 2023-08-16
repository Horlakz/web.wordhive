import { Client } from "../apiClient";

export class ApplicationServiceIcon extends Client {
  constructor() {
    super("/service-icon");
  }

  listServiceIcons() {
    return this.get("");
  }
}
