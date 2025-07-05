import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repositories/user.repository';
import { User } from '../tasks/entities/user.entity';
import { TasksModule } from '../tasks/tasks.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt-strategy';

@Module({
  providers: [AuthService, UserRepository, JwtStrategy],
  controllers: [AuthController],
  imports:[
    ConfigModule,
    TypeOrmModule.forFeature([User]), // registration to enable dependency injection of repositories
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: config.get<string>('JWT_EXPIRES_IN') || '1h',
        },
      }),
    }),
  ],
  exports: [JwtStrategy, PassportModule] // to enable other modules that import (AuthModule) to use my auth mechanism
})
export class AuthModule {}
