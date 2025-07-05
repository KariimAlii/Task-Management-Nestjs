import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksRepository } from './repositories/task.repository';
import { Task } from './entities/task.entity';
import { MockUserService } from './services/mock-user-service';
import { User } from './entities/user.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [TasksController],
  providers: [TasksService, TasksRepository, MockUserService],
  imports:[
    TypeOrmModule.forFeature([Task]), // registration to enable dependency injection of repositories
    AuthModule
  ]
})
export class TasksModule {}
