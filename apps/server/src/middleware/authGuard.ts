import { RequestHandler } from "express";
import { TokenPayload, UnauthorizedError, UserSession } from "~/types";
import jwt from "jsonwebtoken";
import { env } from "~/env";

const authGuard: RequestHandler = (request, _response, next) => {
  const bearerToken = request.header("Authorization");
  if (!bearerToken) {
    return next(new UnauthorizedError("No token"));
  }

  const token = bearerToken.split(" ")[1];
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    request.token = decoded as TokenPayload;
  } catch (error) {
    next(error);
  }

  next();
};

export default authGuard;
