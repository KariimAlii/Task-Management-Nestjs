import { TaskStatus } from '../models/task.model';

export class UpdateTaskDto {
  title: string;
  description: string;
  status: TaskStatus;
}