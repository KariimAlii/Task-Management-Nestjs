import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';

@Module({
  providers: [AuthService, UserRepository],
  controllers: [AuthController],
  imports:[
    TypeOrmModule.forFeature([User]), // registration to enable dependency injection of repositories
  ]
})
export class AuthModule {}
