import { UserSession } from "../auth";

export type LoginResponse = {
  token: string;
};

export type GetSessionResponse = UserSession;
