// services/authService.ts
import apiClient from "./apiClient";
import { SignUpRequest, SignInRequest, AuthResponse } from "@/types/auth";

// ----------- SIGN UP ------------
export const signUp = async (payload: SignUpRequest): Promise<AuthResponse> => {
  try {
    const res = await apiClient.post<AuthResponse>("/api/auth/signup", payload);
    return res.data;
  } catch (err: any) {
    console.error("SignUp Error:", err);
    throw new Error(err?.response?.data?.message || "Sign up failed. Try again.");
  }
};

// ----------- SIGN IN ------------
export const signIn = async (payload: SignInRequest): Promise<AuthResponse> => {
  try {
    const res = await apiClient.post<AuthResponse>("/api/auth/signin", payload);
    return res.data;
  } catch (err: any) {
    console.error("SignIn Error:", err);
    throw new Error(err?.response?.data?.message || "Sign in failed. Try again.");
  }
};

export default {
  signUp,
  signIn,
};
