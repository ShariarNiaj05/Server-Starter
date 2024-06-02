import { Request, Response } from "express";

export const demoRoute = (req: Request, res: Response) => {
  res.send("Hello scratch server!");
};
