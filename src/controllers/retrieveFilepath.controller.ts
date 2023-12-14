// src/controllers/uploadController.ts
import { RequestHandler } from 'express';

export const retrieveFilepath: RequestHandler = (req, res) => {
  console.log("/api/uploads route hit");
  // The filePath is already resolved by our fileExists middleware and stored in res.locals
  const filePath = res.locals.filePath as string;
  res.sendFile(filePath);
};