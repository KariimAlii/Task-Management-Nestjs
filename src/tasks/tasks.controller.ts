import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskVM } from './models/task.model';
import { CreateTaskDto } from './dtos/create-task-dto';
import { UpdateTaskDto } from './dtos/UpdateTaskDto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetTasksFilterDto } from './dtos/get-tasks-filter-dto';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // @ApiResponse({status: 200,type: [TaskVM]})
  @Get('/')
  getAllTasks(@Query() tasksFilterDto: GetTasksFilterDto) {
    if(Object.keys(tasksFilterDto).length){
      return this.tasksService.getAllTasksWithFilters(tasksFilterDto);
    }
    return this.tasksService.getAllTasks();
  }

  @ApiResponse({status: 200,type: TaskVM})
  @Get('/:id')
  async getTaskById(@Param('id') id: string): Promise<TaskVM> {
    const task = await this.tasksService.getTaskById(id);
    if(!task) throw new NotFoundException(`Task with Id {${id}} Not Found`);
    return task
  }

  @Post('/')
  @HttpCode(201)
  // @ApiResponse({status: 201,type: [Task]})
  createTask(@Body() request: CreateTaskDto): Promise<TaskVM> {
    return this.tasksService.createTask(request);
  }

  @Delete('/:id')
  @HttpCode(204)
  async deleteTaskById(@Param('id') id: string) {
    const wasDeleted = await this.tasksService.deleteTaskById(id);
    if (!wasDeleted) {
      throw new NotFoundException('Task not found');
    }
  }

  @Put('/:id')
  // @ApiResponse({status: 201,type: Task})
  async updateTask(@Param('id') id: string, @Body() request: UpdateTaskDto): Promise<TaskVM | null> {
    const updatedTask = await this.tasksService.updateTask(id, request);
    if (!updatedTask) {
      throw new NotFoundException('Task not found');
    }
    return updatedTask;
  }
}
