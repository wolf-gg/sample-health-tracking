import express, { Request, Response } from "express";
import { ExerciseDataService } from "../service/exercise";
import { StepsService } from "../service/steps";
import { SleepDataService } from "../service/sleep";

export class DashboardRouter {
  private router;

  constructor(
    exerciseDataService: ExerciseDataService,
    stepsService: StepsService,
    sleepDateService: SleepDataService,
  ) {
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
      const stepsData = await stepsService.getStepsByDay(new Date(dateString));
      const sleepData = await sleepDateService.getSleepDataByDay(
        new Date(dateString),
      );

      res.json({
        exerciseMinutes: exerciseData.reduce(
          (sum, item) => sum + item.minutes,
          0,
        ),
        steps: stepsData.reduce((sum, item) => sum + item.steps, 0),
        sleepHours: sleepData.reduce((sum, item) => sum + item.hours, 0),
      });
    });

    this.router = router;
  }

  getRouter() {
    return this.router;
  }
}
