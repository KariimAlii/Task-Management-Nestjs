import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksRepository } from './repositories/task.repository';

@Module({
  controllers: [TasksController],
  providers: [TasksService],
  imports:[
    TypeOrmModule.forFeature([TasksRepository]), // registration to enable dependency injection of repositories
  ]
})
export class TasksModule {}
