import { Injectable } from '@nestjs/common';
import { TaskVM , TaskStatus } from './models/task.model';
import { v4 as uuid } from 'uuid'
import { CreateTaskDto } from './dtos/create-task-dto';
import { UpdateTaskDto } from './dtos/UpdateTaskDto';
import { GetTasksFilterDto } from './dtos/get-tasks-filter-dto';
import { TasksRepository } from './repositories/task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
@Injectable()
export class TasksService {
  constructor(
    private readonly tasksRepository: TasksRepository
  ) {}

  async getAllTasks(): Promise<TaskVM[]> {
    const tasksFromDB = await this.tasksRepository.getAllTasks();
    const tasksVM = tasksFromDB
      .map(task => Object.assign(new TaskVM(), {
        id: task.id,
        title: task.title,
        description: task.description,
        status: task.status,
      }))
    return tasksVM;
  }

  async getAllTasksWithFilters(filterDto: GetTasksFilterDto): Promise<TaskVM[]> {
    const tasksFromDB = await this.tasksRepository.getAllTasksWithFilters(filterDto);
    const tasksVM = tasksFromDB
      .map(task => Object.assign(new TaskVM(), {
        id: task.id,
        title: task.title,
        description: task.description,
        status: task.status,
      }))
    return tasksVM;
  }

  async getTaskById(id: string): Promise<TaskVM | null> {
    const taskFromDB = await this.tasksRepository.getTaskById(id);

    return taskFromDB !== null ? Object.assign(new TaskVM(), {
      id: taskFromDB.id,
      title: taskFromDB.title,
      description: taskFromDB.description,
      status: taskFromDB.status,
    }) : null;
  }
  async createTask(request: CreateTaskDto): Promise<TaskVM> {
    const task = await this.tasksRepository.createTask(request);

    return Object.assign(new TaskVM(), {
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
    });
  }

  async deleteTaskById(id: string): Promise<boolean> {
    return await this.tasksRepository.deleteTaskById(id);
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<TaskVM | null> {
    const task = await this.tasksRepository.updateTask(id, updateTaskDto);
    return task !== null ? Object.assign(new TaskVM(), {
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
    }) : null;
  }
}
