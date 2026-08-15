import { SleepDataRepository } from "../repository/sleep";
import { SleepData } from "../types/sleep";

export class SleepDataService {
  private sleepDataRepository: SleepDataRepository;

  constructor(sleepDataRepository: SleepDataRepository) {
    this.sleepDataRepository = sleepDataRepository;
  }

  async insertSleepData(data: SleepData) {
    await this.sleepDataRepository.insertSleepData(data);
  }

  async getSleepDataByDay(date: Date) {
    return await this.sleepDataRepository.getSleepDataByDay(date);
  }
}
