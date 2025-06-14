import { DataSource, Repository } from 'typeorm';
import { Task } from '../entities/task.entity';
import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from '../dtos/create-task-dto';
import { TaskStatus } from '../models/task.model';
import { UpdateTaskDto } from '../dtos/UpdateTaskDto';
import { GetTasksFilterDto } from '../dtos/get-tasks-filter-dto';

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

  async getAllTasks(): Promise <Task[]> {
    return await this.repo.find();
  }

  async getAllTasksWithFilters(tasksFilterDto: GetTasksFilterDto): Promise <Task[]> {
    const query = this.repo.createQueryBuilder('task');

    if (tasksFilterDto.status) {
      query.andWhere('task.status = :status', { status: tasksFilterDto.status });
    }

    if (tasksFilterDto.search) {
      query.andWhere(
        '(task.title LIKE :search OR task.description LIKE :search)',
        { search: `%${tasksFilterDto.search}%` }
      );
    }

    return await query.getMany();
  }
  async getTaskById(id: string): Promise<Task | null> {
    return await this.repo.findOneBy({ id });
  }
  async findOpenTasks(): Promise<Task[]> {
    return await this.repo.findBy({ status: TaskStatus.OPEN });
  }
  async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<Task | null> {
    const task = await this.repo.findOneBy({ id });
    if(task) {
      task.title = updateTaskDto.title;
      task.description = updateTaskDto.description;
      task.status = updateTaskDto.status;
      await this.repo.save(task);
    }

    return task;
  }
  async deleteTaskById(id: string) : Promise<boolean> {
    const deleteResult = await this.repo.delete(id)
    return deleteResult.affected !== null && deleteResult.affected !== undefined && deleteResult.affected > 0;
  }
}