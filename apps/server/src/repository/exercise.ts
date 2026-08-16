import { Db } from "mongodb";
import { ExerciseData } from "../types/exercise";
import { getStartAndEndOfDay } from "../helper/date";

export class ExerciseDataRepository {
  private collection;

  constructor(db: Db) {
    this.collection = db.collection("exercise");
  }

  async insertExerciseData(data: ExerciseData) {
    await this.collection.insertOne(data);
  }

  async getExerciseDataByDay(date: Date) {
    const { startOfDay, endOfDay } = getStartAndEndOfDay(date);

    const exerciseData = await this.collection
      .find<ExerciseData>({
        date: { $gte: startOfDay, $lte: endOfDay },
      })
      .toArray();

    return exerciseData;
  }
}
