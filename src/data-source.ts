import 'dotenv/config';
import { DataSource } from 'typeorm';
import { CustomLogger } from './logger/custom-logger';
import { Project } from './tasks/entities/project.entity';
import { Task } from './tasks/entities/task.entity';
import { User } from './tasks/entities/user.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASENAME,
  entities: [Task, User, Project], // Add all your entities
  migrations: ['src/migrations/*.js'], // Migration files location
  migrationsTableName: 'typeorm_migrations', // Optional custom name
  synchronize: false, // MUST BE FALSE when using migrations
  logging: true, // Enable SQL query logging (optional)
  logger: new CustomLogger(),
});