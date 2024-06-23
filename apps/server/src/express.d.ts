import { TokenPayload } from "./types";

declare global {
  namespace Express {
    interface Request {
      token: TokenPayload | null;
    }
  }
}
