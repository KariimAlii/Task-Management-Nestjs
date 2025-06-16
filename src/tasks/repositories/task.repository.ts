import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Task } from '../entities/task.entity';
import { CreateTaskDto } from '../dtos/create-task-dto';
import { User } from '../entities/user.entity';
import { TaskStatus } from '../models/task.model';
import { UpdateTaskDto } from '../dtos/UpdateTaskDto';
import { GetTasksFilterDto } from '../dtos/get-tasks-filter-dto';

@Injectable()
export class TasksRepository {
  private repo: Repository<Task>;

  constructor(private readonly dataSource: DataSource) {
    this.repo = dataSource.getRepository(Task);
  }

  async createTask(createDto: CreateTaskDto, user: User): Promise<Task> {
    const task = this.repo.create({
      title: createDto.title,
      description: createDto.description,
      status: TaskStatus.OPEN,
      createdBy: user,
    });

    return await this.repo.save(task);
  }

  async getAllTasks(): Promise<Task[]> {

    // Lazy Loading (SELECT on Task Table only)
    return await this.repo.find();

    // Eager Loading ( SELECT * + Left Join )
    return await this.repo.find({
      relations: ['createdBy', 'assignees', 'project'],
    });

    // Selective Loading ( Select specific columns + Left Join  )
    return await this.repo.createQueryBuilder('task')
      .leftJoinAndSelect('task.createdBy', 'createdBy')
      .leftJoinAndSelect('task.assignees', 'assignees')
      .leftJoinAndSelect('task.project', 'project')
      .select([
        'task.id',
        'task.title',
        'task.status',
        'createdBy.id',       // Only get ID from creator
        'createdBy.username', // and username
        'assignees.id',       // Only get ID from assignees
        'project.id',         // Only get ID from project
        'project.name'        // and name
      ])
      .getMany();
  }

  async getAllTasksWithFilters(tasksFilterDto: GetTasksFilterDto): Promise<Task[]> {
    const query = this.repo.createQueryBuilder('task')
      .leftJoinAndSelect('task.createdBy', 'createdBy')
      .leftJoinAndSelect('task.assignees', 'assignees')
      .leftJoinAndSelect('task.project', 'project');

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
    return await this.repo.findOne({
      where: { id },
      relations: ['createdBy', 'assignees', 'project'],
    });
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<Task | null> {
    const task = await this.repo.findOneBy({ id });
    if (task) {
      if (updateTaskDto.title) task.title = updateTaskDto.title;
      if (updateTaskDto.description) task.description = updateTaskDto.description;
      if (updateTaskDto.status) task.status = updateTaskDto.status;
      await this.repo.save(task);
    }
    return task;
  }

  async deleteTaskById(id: string): Promise<boolean> {
    const deleteResult = await this.repo.delete(id);
    return deleteResult.affected != null && deleteResult.affected > 0;
  }
}