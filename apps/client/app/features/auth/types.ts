import { z } from "zod";

export type LoginFormData = z.infer<typeof loginFormSchema>;
export const loginFormSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export type RegisterFormData = z.infer<typeof registerFormSchema>;
export const registerFormSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export type TokenPayload = {
  userId: string;
  username: string;
  iat: number;
  exp: number;
};

export type UserSession = {
  userId: string;
  username: string;
};

export type LoginResponse = {
  token: string;
};

export type RegisterResponse = {
  token: string;
};
