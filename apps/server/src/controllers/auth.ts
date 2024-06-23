import { eq } from "drizzle-orm";
import { NextFunction, Request, Response } from "express";
import { db } from "~/db";
import { users } from "~/db/schema";
import { BadRequestError, NotFoundError, TokenPayload, UserSession } from "~/types";
import { loginRequestSchema, registerRequestSchema } from "~/types/request";
import bcrypt from "bcryptjs";
import { GetSessionResponse, LoginResponse } from "~/types/response";
import jwt from "jsonwebtoken";
import { env } from "~/env";

export const login = async (request: Request, response: Response, next: NextFunction) => {
  const loginData = loginRequestSchema.parse(request.body);

  const user = await db.select().from(users).where(eq(users.username, loginData.username)).limit(1);
  if (user.length === 0) {
    throw new NotFoundError("User not found");
  }

  const passwordMatch = await bcrypt.compare(loginData.password, user[0].hashed_password);
  if (!passwordMatch) {
    throw new BadRequestError("Invalid password");
  }

  const token = jwt.sign({ userId: user[0].id } satisfies TokenPayload, env.JWT_SECRET, {
    expiresIn: "1h",
  });

  response.json({ token } satisfies LoginResponse);
};

export const getSession = async (request: Request, response: Response, _next: NextFunction) => {
  const token = request.token!;

  const user = await db.select().from(users).where(eq(users.id, token.userId)).limit(1);
  if (user.length === 0) {
    throw new NotFoundError("User not found");
  }

  response.json({ userId: user[0].id, username: user[0].username } satisfies GetSessionResponse);
};

export const register = async (request: Request, response: Response, next: NextFunction) => {
  const registerData = registerRequestSchema.parse(request.body);

  const hashedPassword = await bcrypt.hash(registerData.password, 10);
  const user = await db
    .insert(users)
    .values({
      username: registerData.username,
      hashed_password: hashedPassword,
    })
    .returning();

  const token = jwt.sign({ userId: user[0].id } satisfies TokenPayload, env.JWT_SECRET, {
    expiresIn: "1h",
  });

  response.json({ token } satisfies LoginResponse);
};
