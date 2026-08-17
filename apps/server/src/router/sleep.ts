import express, { Request, Response } from "express";
import { SleepDataService } from "../service/sleep";

export class SleepDataRouter {
  private router;

  constructor(sleepDataService: SleepDataService) {
    const router = express.Router();

    router.get("/", async (req: Request, res: Response) => {
      const { dateString } = req.query;

      if (dateString === undefined || typeof dateString !== "string") {
        res.status(400).send(`"dateString" query parameter is required`);
        return;
      }

      const sleepData = await sleepDataService.getSleepDataByDay(
        new Date(dateString),
      );
      res.json(sleepData);
    });

    router.post("/", async (req: Request, res: Response) => {
      const { dateString, hours } = req.body;

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

      const parsedHours = Number(hours);
      if (!Number.isFinite(parsedHours) || parsedHours < 0) {
        res
          .status(400)
          .send(`"hours" is required and must be a non-negative number`);
        return;
      }

      await sleepDataService.insertSleepData({
        date: parsedDate,
        hours: parsedHours,
      });

      res.status(201).json({ message: "Sleep data created" });
    });

    this.router = router;
  }

  getRouter() {
    return this.router;
  }
}
