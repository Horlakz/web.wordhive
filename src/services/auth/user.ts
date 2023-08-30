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

  getAllUsers(name: string, page: number = 1, limit: number = 10) {
    return this.get("all", { params: { name, page, limit } });
  }

  getAllAdmins(name: string, page: number = 1, limit: number = 10) {
    return this.get("admin", { params: { name, page, limit } });
  }

  getUser(uuid: string) {
    return this.get(uuid);
  }

  deleteUser(uuid: string) {
    return this.delete(uuid);
  }
}
