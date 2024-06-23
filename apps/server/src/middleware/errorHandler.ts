import { ErrorRequestHandler } from "express";
import { ErrorResponse, HttpError } from "~/types";

const errorHandler: ErrorRequestHandler = (error, _request, response, next) => {
  console.error(error);

  if (error instanceof HttpError) {
    return response
      .status(error.status)
      .send({ status: error.status, message: error.message } satisfies ErrorResponse);
  }

  response.status(500).send({ message: "Internal server error" });
};

export default errorHandler;
