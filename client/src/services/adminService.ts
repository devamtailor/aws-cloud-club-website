import { http } from "./http";
import type { ApiResponse } from "../types/api";
import type { LoginPayload, LoginResult } from "../types/auth";

export const adminService = {
  async login(payload: LoginPayload): Promise<LoginResult> {
    const response = await http.post<ApiResponse<LoginResult>>("/admin/login", payload);

    if (!response.data.data) {
      throw new Error("Login failed");
    }

    return response.data.data;
  }
};
