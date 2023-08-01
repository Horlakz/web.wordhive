import { Client } from "../apiClient";

export class UserService extends Client {
  constructor() {
    super("/user/");
  }

  getProfile() {
    return this.get("");
  }
}
