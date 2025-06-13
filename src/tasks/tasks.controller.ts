import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './models/task.model';
import { CreateTaskDto } from './dtos/create-task-dto';
import { UpdateTaskDto } from './dtos/UpdateTaskDto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @ApiResponse({status: 200,type: [Task]})
  @Get('/')
  getAllTasks() {
    return this.tasksService.getAllTasks();
  }

  @ApiResponse({status: 200,type: Task})
  @Get('/:id')
  getTaskById(@Param('id') id: string) {
    return this.tasksService.getTaskById(id);
  }

  @Post('/')
  @HttpCode(201)
  @ApiResponse({status: 201,type: [Task]})
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
  @ApiResponse({status: 201,type: Task})
  async updateTask(@Param('id') id: string, @Body() request: UpdateTaskDto) {
    const updatedTask = this.tasksService.updateTask(id, request);
    if (!updatedTask) {
      throw new NotFoundException('Task not found');
    }
    return updatedTask;
  }
}
