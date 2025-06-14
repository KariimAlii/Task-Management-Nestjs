import { Injectable } from '@nestjs/common';
import { TaskVM , TaskStatus } from './models/task.model';
import { CreateTaskDto } from './dtos/create-task-dto';
import { UpdateTaskDto } from './dtos/UpdateTaskDto';
import { GetTasksFilterDto } from './dtos/get-tasks-filter-dto';
import { TasksRepository } from './repositories/task.repository';

@Injectable()
export class TasksService {
  constructor(
    private readonly tasksRepository: TasksRepository
  ) {}

  async getAllTasks(): Promise<TaskVM[]> {
    const tasksFromDB = await this.tasksRepository.getAllTasks();
    const tasksVM = tasksFromDB.map(task => TaskVM.from(task));
    return tasksVM;
  }

  async getAllTasksWithFilters(filterDto: GetTasksFilterDto): Promise<TaskVM[]> {
    const tasksFromDB = await this.tasksRepository.getAllTasksWithFilters(filterDto);
    const tasksVM = tasksFromDB.map(TaskVM.from);
    return tasksVM;
  }

  async getTaskById(id: string): Promise<TaskVM | null> {
    const taskFromDB = await this.tasksRepository.getTaskById(id);

    return taskFromDB !== null ? TaskVM.from(taskFromDB) : null;
  }
  async createTask(request: CreateTaskDto): Promise<TaskVM> {
    const task = await this.tasksRepository.createTask(request);

    return TaskVM.from(task);
  }

  async deleteTaskById(id: string): Promise<boolean> {
    return await this.tasksRepository.deleteTaskById(id);
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<TaskVM | null> {
    const task = await this.tasksRepository.updateTask(id, updateTaskDto);
    return task !== null ? TaskVM.from(task) : null;
  }
}
