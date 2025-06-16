import { Injectable } from '@nestjs/common';
import { TasksRepository } from './repositories/task.repository';
import { MockUserService } from './services/mock-user-service';
import { TaskVM } from './models/task.model';
import { GetTasksFilterDto } from './dtos/get-tasks-filter-dto';
import { CreateTaskDto } from './dtos/create-task-dto';
import { UpdateTaskDto } from './dtos/UpdateTaskDto';

@Injectable()
export class TasksService {
  constructor(
    private readonly tasksRepository: TasksRepository,
    private readonly mockUserService: MockUserService
  ) {}

  async getAllTasks(): Promise<TaskVM[]> {
    const tasksFromDB = await this.tasksRepository.getAllTasks();
    return tasksFromDB.map(task => TaskVM.from(task));
  }

  async getAllTasksWithFilters(filterDto: GetTasksFilterDto): Promise<TaskVM[]> {
    const tasksFromDB = await this.tasksRepository.getAllTasksWithFilters(filterDto);
    return tasksFromDB.map(TaskVM.from);
  }

  async getTaskById(id: string): Promise<TaskVM | null> {
    const taskFromDB = await this.tasksRepository.getTaskById(id);
    return taskFromDB !== null ? TaskVM.from(taskFromDB) : null;
  }

  async createTask(request: CreateTaskDto): Promise<TaskVM> {
    const mockUser = this.mockUserService.getMockUser();
    const task = await this.tasksRepository.createTask(request, mockUser);
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