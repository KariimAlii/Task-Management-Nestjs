import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksRepository } from './repositories/task.repository';
import { Task } from './entities/task.entity';

@Module({
  controllers: [TasksController],
  providers: [TasksService],
  imports:[
    TypeOrmModule.forFeature([Task]), // registration to enable dependency injection of repositories
  ]
})
export class TasksModule {}
