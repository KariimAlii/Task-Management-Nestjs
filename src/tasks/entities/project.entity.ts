import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Task } from './task.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  // Each project belongs to a user (owner)
  @ManyToOne(() => User, (user) => user.ownedProjects)
  owner: User;

  // Each project can have many tasks
  @OneToMany(() => Task, (task) => task.project)
  tasks: Task[];
}