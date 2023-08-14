import { Client } from "../apiClient";

export interface UserData {
  fullname: string;
  email: string;
  isAdmin: boolean;
  isEmailVerified: boolean;
  created_at: string;
}

export class UserService extends Client {
  constructor() {
    super("/user/");
  }

  getProfile() {
    return this.get("");
  }

  getAllUsers() {
    return this.get("all");
  }

  getAllAdmins() {
    return this.get("admin");
  }

  getUser(uuid: string) {
    return this.get(uuid);
  }
}
