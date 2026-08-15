import express, { Request, Response } from "express";

export class HealthRouter {
  private router;

  constructor() {
    const router = express.Router();

    router.get("/", (req: Request, res: Response) => {
      res.send("Server is running");
    });

    this.router = router;
  }

  getRouter() {
    return this.router;
  }
}
