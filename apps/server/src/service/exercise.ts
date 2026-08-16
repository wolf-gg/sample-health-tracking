import { ExerciseDataRepository } from "../repository/exercise";
import { ExerciseData } from "../types/exercise";

export class ExerciseDataService {
  private exerciseDataRepository: ExerciseDataRepository;

  constructor(exerciseDataRepository: ExerciseDataRepository) {
    this.exerciseDataRepository = exerciseDataRepository;
  }

  async insertExerciseData(data: ExerciseData) {
    await this.exerciseDataRepository.insertExerciseData(data);
  }

  async getExerciseDataByDay(date: Date) {
    return this.exerciseDataRepository.getExerciseDataByDay(date);
  }
}
