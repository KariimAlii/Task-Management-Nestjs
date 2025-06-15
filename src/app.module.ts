import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomLogger } from './logger/custom-logger';
import { AppDataSource } from './data-source';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        ...AppDataSource.options,
        autoLoadEntities: true, // Optional (auto-registers entities)
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
