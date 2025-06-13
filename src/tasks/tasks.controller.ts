import { Body, Controller, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './models/task.model';
import { v4 as uuid } from 'uuid';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get('/')
  getAllTasks() {
    return this.tasksService.getAllTasks();
  }

  @Post('/')
  createTask(@Body('title') title: string, @Body('description') description: string) {
    return this.tasksService.createTask(title, description);
  }
}
