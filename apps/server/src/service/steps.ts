import { StepsRepository } from "../repository/steps";
import { StepData } from "../types/steps";

export class StepsService {
  private stepsRepository: StepsRepository;

  constructor(stepsRepository: StepsRepository) {
    this.stepsRepository = stepsRepository;
  }

  async insertStepData(data: StepData) {
    await this.stepsRepository.insertStepData(data);
  }

  async getStepsByDay(date: Date) {
    return await this.stepsRepository.getStepsByDay(date);
  }
}
