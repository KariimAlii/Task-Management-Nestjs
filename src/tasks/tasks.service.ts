import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './models/task.model';
import { v4 as uuid } from 'uuid'
import { CreateTaskDto } from './dtos/create-task-dto';
@Injectable()
export class TasksService {
  private tasks : Task[] = [
    {id: uuid(), title: 'Task 1', description: 'My Task 1', status: TaskStatus.DONE },
    {id: uuid(), title: 'Task 2', description: 'My Task 2', status: TaskStatus.IN_PROGRESS },
    {id: uuid(), title: 'Task 3', description: 'My Task 3', status: TaskStatus.OPEN },
  ];

  getAllTasks() {
    return this.tasks;
  }

  createTask(request: CreateTaskDto) : Task {
    const task: Task = {
      id: uuid(),
      title: request.title,
      description: request.description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task)

    return task;
  }
}
