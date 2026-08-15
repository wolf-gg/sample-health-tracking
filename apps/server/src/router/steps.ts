import express, { Request, Response } from "express";
import { StepsService } from "../service/steps";

export class StepsRouter {
  private router;

  constructor(stepsService: StepsService) {
    const router = express.Router();

    router.get("/", async (req: Request, res: Response) => {
      const { dateString } = req.query;

      if (dateString === undefined || typeof dateString !== "string") {
        res.status(400).send(`"dateString" query parameter is required`);
        return;
      }

      const steps = await stepsService.getStepsByDay(new Date(dateString));
      res.json(steps);
    });

    this.router = router;
  }

  getRouter() {
    return this.router;
  }
}
