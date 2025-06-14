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

  private tasks: TaskVM[] = [
    {
      id: uuid(),
      title: 'Task 1',
      description: 'My Task 1',
      status: TaskStatus.DONE,
    },
    {
      id: uuid(),
      title: 'Task 2',
      description: 'My Task 2',
      status: TaskStatus.IN_PROGRESS,
    },
    {
      id: uuid(),
      title: 'Task 3',
      description: 'My Task 3',
      status: TaskStatus.OPEN,
    },
  ];

  getAllTasks() {
    return this.tasks;
  }

  getAllTasksWithFilters(filterDto: GetTasksFilterDto): TaskVM[] {
    const { status, search } = filterDto;
    let tasks = this.tasks;
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }
    if (search) {
      tasks = tasks.filter(
        (task) =>
          task.title.includes(search) || task.description.includes(search),
      );
    }
    return tasks;
  }

  async getTaskById(id: string): Promise<TaskVM | null> {
    const taskFromDB = await this.tasksRepository.getTaskById(id);

    return taskFromDB ? Object.assign(new TaskVM(), {
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

  deleteTaskById(id: string): boolean {
    const initialLength = this.tasks.length;
    this.tasks = this.tasks.filter((task) => task.id !== id);
    return initialLength !== this.tasks.length;
  }

  updateTask(id: string, updateTaskDto: UpdateTaskDto): TaskVM | null {
    const task = this.tasks.find((task) => task.id === id);
    if (task) {
      task.title = updateTaskDto.title;
      task.description = updateTaskDto.description;
      task.status = updateTaskDto.status;
      return task;
    }
    return null;
  }
}
