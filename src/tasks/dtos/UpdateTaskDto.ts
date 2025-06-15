import { TaskStatus } from '../models/task.model';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsEnum, IsArray, IsString, IsNotEmpty } from 'class-validator';

export class UpdateTaskDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsEnum(TaskStatus)
  status: TaskStatus;

  @IsOptional()
  projectId?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  assigneeIds?: string[];
}