import { Db } from "mongodb";
import { SleepData } from "../types/sleep";
import { getStartAndEndOfDay } from "../helper/date";

export class SleepDataRepository {
  private collection;

  constructor(db: Db) {
    this.collection = db.collection("sleep");
  }

  async insertSleepData(data: SleepData) {
    await this.collection.insertOne(data);
  }

  async getSleepDataByDay(date: Date) {
    const { startOfDay, endOfDay } = getStartAndEndOfDay(date);

    const sleepData = await this.collection
      .find<SleepData>({
        date: { $gte: startOfDay, $lte: endOfDay },
      })
      .toArray();

    return sleepData;
  }
}
