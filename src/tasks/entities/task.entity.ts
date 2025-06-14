import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from '../models/task.model';

@Entity()
export class Task {
  // @PrimaryGeneratedColumn() // '1' , '2' , '3' , ...
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;
}