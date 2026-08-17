import express, { Request, Response } from "express";
import { ExerciseDataService } from "../service/exercise";

export class ExerciseDataRouter {
  private router;

  constructor(exerciseDataService: ExerciseDataService) {
    const router = express.Router();

    router.get("/", async (req: Request, res: Response) => {
      const { dateString } = req.query;

      if (dateString === undefined || typeof dateString !== "string") {
        res.status(400).send(`"dateString" query parameter is required`);
        return;
      }

      const exerciseData = await exerciseDataService.getExerciseDataByDay(
        new Date(dateString),
      );
      res.json(exerciseData);
    });

    router.post("/", async (req: Request, res: Response) => {
      const { dateString, minutes } = req.body;

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

      const parsedMinutes = Number(minutes);
      if (!Number.isFinite(parsedMinutes) || parsedMinutes < 0) {
        res
          .status(400)
          .send(`"minutes" is required and must be a non-negative number`);
        return;
      }

      await exerciseDataService.insertExerciseData({
        date: parsedDate,
        minutes: parsedMinutes,
      });

      res.status(201).json({ message: "Exercise data created" });
    });

    this.router = router;
  }

  getRouter() {
    return this.router;
  }
}
