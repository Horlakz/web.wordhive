import { Client } from "../apiClient";

interface UserData {
  fullname: string;
  email: string;
  password: string;
}

export interface UserAdminData extends UserData {
  isAdmin: boolean;
}

interface VerificationData extends Pick<UserData, "email"> {
  code: string;
  password?: string;
}

interface LoginData extends Omit<UserData, "fullname"> {}

export class AuthService extends Client {
  constructor() {
    super("/auth");
  }

  login(data: LoginData) {
    return this.post<LoginData>("/login", data);
  }

  register(data: UserData) {
    return this.post<UserData>("/register", data);
  }

  registerAdmin(data: UserAdminData) {
    return this.post("/register-admin", data);
  }

  verifyEmail(data: VerificationData) {
    return this.post("/verify-email", data);
  }

  resendCode(email: string) {
    return this.post("/resend-code", { email });
  }

  forgotPassword(email: string) {
    return this.post("/forgot-password", { email });
  }

  resetPassword(data: VerificationData) {
    return this.post("/reset-password", data);
  }
}
