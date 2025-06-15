import { TaskStatus } from '../models/task.model';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class GetTasksFilterDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus | null = null;  // status? means optional

  @IsOptional()
  @IsString()
  search?: string | null = null;

  @IsOptional()
  @IsString()
  projectId?: string;

  @IsOptional()
  @IsString()
  userId?: string;
}