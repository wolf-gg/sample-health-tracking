import bodyParser from "body-parser";
import express, { type Express } from "express";
import morgan from "morgan";
import cors from "cors";
import { HealthRouter } from "./router/health";
import { StepsRouter } from "./router/steps";
import { StepsService } from "./service/steps";
import { StepsRepository } from "./repository/steps";
import getDb from "./helper/mongo";
import { SleepDataRepository } from "./repository/sleep";
import { SleepDataService } from "./service/sleep";
import { SleepDataRouter } from "./router/sleep";
import { ExerciseDataRepository } from "./repository/exercise";
import { ExerciseDataService } from "./service/exercise";
import { ExerciseDataRouter } from "./router/exercise";
import { DashboardRouter } from "./router/dashboard";

const { json, urlencoded } = bodyParser;

export const createServer = async (): Promise<Express> => {
  const app = express();

  const db = await getDb();

  const stepsRepository = new StepsRepository(db);
  const sleepDataRepository = new SleepDataRepository(db);
  const exerciseDataRepository = new ExerciseDataRepository(db);

  const stepsService = new StepsService(stepsRepository);
  const sleepDataService = new SleepDataService(sleepDataRepository);
  const exerciseDataService = new ExerciseDataService(exerciseDataRepository);

  const healthRouter = new HealthRouter();
  const stepsRouter = new StepsRouter(stepsService);
  const sleepDataRouter = new SleepDataRouter(sleepDataService);
  const exerciseDataRouter = new ExerciseDataRouter(exerciseDataService);
  const dashboardRouter = new DashboardRouter(
    exerciseDataService,
    stepsService,
    sleepDataService,
  );

  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors())
    .use("/health", healthRouter.getRouter())
    .use("/steps", stepsRouter.getRouter())
    .use("/sleep", sleepDataRouter.getRouter())
    .use("/exercise", exerciseDataRouter.getRouter())
    .use("/dashboard", dashboardRouter.getRouter());

  return app;
};
