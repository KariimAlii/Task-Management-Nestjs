import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Put } from '@nestjs/common';
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
  @HttpCode(204)
  deleteTaskById(@Param('id') id: string) {
    const wasDeleted = this.tasksService.deleteTaskById(id);
    if (!wasDeleted) {
      throw new NotFoundException('Task not found');
    }
  }

  @Put('/:id')
  async updateTask(@Param('id') id: string, @Body() request: UpdateTaskDto) {
    const updatedTask = this.tasksService.updateTask(id, request);
    if (!updatedTask) {
      throw new NotFoundException('Task not found');
    }
    return updatedTask;
  }
}
