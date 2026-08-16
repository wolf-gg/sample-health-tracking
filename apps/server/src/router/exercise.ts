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

    this.router = router;
  }

  getRouter() {
    return this.router;
  }
}
