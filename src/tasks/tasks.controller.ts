import { Controller, Get, Post, Body, Param, Delete, Put, Query, HttpCode, NotFoundException } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskVM } from './models/task.model';
import { CreateTaskDto } from './dtos/create-task-dto';
import { GetTasksFilterDto } from './dtos/get-tasks-filter-dto';
import { UpdateTaskDto } from './dtos/UpdateTaskDto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  @HttpCode(201)
  createTask(@Body() request: CreateTaskDto): Promise<TaskVM> {
    return this.tasksService.createTask(request);
  }

  @Get()
  getAllTasks(@Query() tasksFilterDto: GetTasksFilterDto) {
    if (Object.keys(tasksFilterDto).length) {
      return this.tasksService.getAllTasksWithFilters(tasksFilterDto);
    }
    return this.tasksService.getAllTasks();
  }

  @Get(':id')
  async getTaskById(@Param('id') id: string): Promise<TaskVM> {
    const task = await this.tasksService.getTaskById(id);
    if (!task) throw new NotFoundException(`Task with ID ${id} not found`);
    return task;
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteTaskById(@Param('id') id: string) {
    const wasDeleted = await this.tasksService.deleteTaskById(id);
    if (!wasDeleted) {
      throw new NotFoundException('Task not found');
    }
  }

  @Put(':id')
  async updateTask(
    @Param('id') id: string,
    @Body() request: UpdateTaskDto
  ): Promise<TaskVM | null> {
    const updatedTask = await this.tasksService.updateTask(id, request);
    if (!updatedTask) {
      throw new NotFoundException('Task not found');
    }
    return updatedTask;
  }
}