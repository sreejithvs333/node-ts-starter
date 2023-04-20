import express, { Request, Response } from "express";
import { UserService } from "../services/users.service";

const users = express.Router();

users.get("/", async (req: Request, res: Response) => {
  const userService = new UserService();
  try {
    const result = await userService.index();
    res.status(200).json(result);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(400).json(err);
    }
  }
});

export default users;
