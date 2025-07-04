import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repositories/user.repository';
import { User } from '../tasks/entities/user.entity';
import { TasksModule } from '../tasks/tasks.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [AuthService, UserRepository],
  controllers: [AuthController],
  imports:[
    TypeOrmModule.forFeature([User]), // registration to enable dependency injection of repositories
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: '$$$$MySecret$$$$$',
      signOptions: {
        expiresIn: '1h', // 3600 ms
      }
    })
  ]
})
export class AuthModule {}
