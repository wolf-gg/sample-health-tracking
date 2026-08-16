import { Db } from "mongodb";
import { StepData } from "../types/steps";
import { getStartAndEndOfDay } from "../helper/date";

export class StepsRepository {
  private collection;

  constructor(db: Db) {
    this.collection = db.collection("steps");
  }

  async insertStepData(data: StepData) {
    await this.collection.insertOne(data);
  }

  async getStepsByDay(date: Date) {
    const { startOfDay, endOfDay } = getStartAndEndOfDay(date);

    const steps = await this.collection
      .find<StepData>({
        date: { $gte: startOfDay, $lte: endOfDay },
      })
      .toArray();

    return steps;
  }
}
