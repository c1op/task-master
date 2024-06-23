import { db } from "~/db";
import { Request, Response } from "express";
import { CreateLabelResponse, GetLabelsResponse } from "~/types/response";
import { createLabelRequestSchema, updateLabelRequestSchema } from "~/types/request";
import { labels } from "~/db/schema";
import { eq } from "drizzle-orm";

export const getLabels = async (request: Request, response: Response) => {
  const token = request.token!;

  const dbLabels = await db.query.labels.findMany({
    columns: {
      id: true,
      name: true,
    },
    where: (labels, { eq }) => eq(labels.user_id, token.userId),
  });

  const data: GetLabelsResponse = dbLabels;
  response.json(data);
};

export const createLabel = async (request: Request, response: Response) => {
  const token = request.token!;
  const createLabel = createLabelRequestSchema.parse(request.body);

  const label = await db
    .insert(labels)
    .values({ name: createLabel.name, user_id: token.userId })
    .returning();

  const data: CreateLabelResponse = label[0];
  response.json(data);
};

export const updateLabel = async (request: Request, response: Response) => {
  const labelId = request.params.labelId;
  const updateLabel = updateLabelRequestSchema.parse(request.body);

  const label = await db
    .update(labels)
    .set({ name: updateLabel.name })
    .where(eq(labels.id, labelId))
    .returning();

  response.json(label[0]);
};

export const deleteLabel = async (request: Request, response: Response) => {
  const labelId = request.params.labelId;

  await db.delete(labels).where(eq(labels.id, labelId));

  response.json({});
};
