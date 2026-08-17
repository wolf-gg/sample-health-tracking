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

    router.post("/", async (req: Request, res: Response) => {
      const { dateString, steps } = req.body;

      if (dateString === undefined || typeof dateString !== "string") {
        res
          .status(400)
          .send(`"date" is required and must be a valid ISO string`);
        return;
      }

      const parsedDate = new Date(dateString);
      if (Number.isNaN(parsedDate.getTime())) {
        res.status(400).send(`"date" is not a valid date`);
        return;
      }

      const parsedSteps = Number(steps);
      if (
        !Number.isFinite(parsedSteps) ||
        !Number.isInteger(parsedSteps) ||
        parsedSteps < 0
      ) {
        res
          .status(400)
          .send(`"steps" is required and must be a non-negative integer`);
        return;
      }

      await stepsService.insertStepData({
        date: parsedDate,
        steps: parsedSteps,
      });

      res.status(201).json({ message: "Step data created" });
    });

    this.router = router;
  }

  getRouter() {
    return this.router;
  }
}
