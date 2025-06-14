import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomLogger } from './logger/custom-logger';


@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1111',
      database: 'tasks-management',
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
      logger: new CustomLogger(),
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
