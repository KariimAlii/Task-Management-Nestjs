import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './models/task.model';
import { CreateTaskDto } from './dtos/create-task-dto';
import { UpdateTaskDto } from './dtos/UpdateTaskDto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get('/')
  getAllTasks() {
    return this.tasksService.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string) {
    return this.tasksService.getTaskById(id);
  }

  @Post('/')
  createTask(@Body() request: CreateTaskDto) {
    return this.tasksService.createTask(request);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): Task[] {
    return this.tasksService.deleteTaskById(id);
  }

  @Put('/:id')
  updateTask(@Param('id') id:string, @Body() request: UpdateTaskDto): Task|undefined {
    return this.tasksService.updateTask(id, request);
  }
}
