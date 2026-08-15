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

    this.router = router;
  }

  getRouter() {
    return this.router;
  }
}
