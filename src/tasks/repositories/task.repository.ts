import { DataSource, Repository } from 'typeorm';
import { Task } from '../entities/task.entity';
import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from '../dtos/create-task-dto';
import { TaskStatus } from '../models/task.model';

@Injectable()
export class TasksRepository {
  private repo: Repository<Task>;

  constructor(private readonly dataSource: DataSource) {
    this.repo = dataSource.getRepository(Task);
  }

  async createTask(createDto: CreateTaskDto): Promise<Task> {
    const task = this.repo.create({
      title: createDto.title,
      description: createDto.description,
      status: TaskStatus.OPEN,
    });

    return await this.repo.save(task);
  }

  async getTaskById(id: string): Promise<Task | null> {
    return await this.repo.findOneBy({ id });
  }
  async findOpenTasks(): Promise<Task[]> {
    return await this.repo.findBy({ status: TaskStatus.OPEN });
  }
}