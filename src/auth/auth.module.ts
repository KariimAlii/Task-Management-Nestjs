import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repositories/user.repository';
import { User } from '../tasks/entities/user.entity';
import { TasksModule } from '../tasks/tasks.module';

@Module({
  providers: [AuthService, UserRepository],
  controllers: [AuthController],
  imports:[
    TypeOrmModule.forFeature([User]), // registration to enable dependency injection of repositories
    TasksModule
  ]
})
export class AuthModule {}
