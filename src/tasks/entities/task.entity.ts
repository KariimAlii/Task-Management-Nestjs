import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany } from 'typeorm';
import { User } from './user.entity';
import { Project } from './project.entity';

export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.OPEN,
  })
  status: TaskStatus;

  // Each task belongs to a project
  @ManyToOne(() => Project, (project) => project.tasks, { onDelete: 'CASCADE' })
  project: Project;

  // Each task is created by a user
  @ManyToOne(() => User, (user) => user.createdTasks)
  createdBy: User;

  // Each task can be assigned to many users
  @ManyToMany(() => User, (user) => user.assignedTasks)
  assignees: User[];
}


// Entities:
// User
// Project
// Task

// ✅ Relationships:
// A User can have many Tasks (1:M)
// A Project can have many Tasks (1:M)
// A User can have many Projects (1:M)
// A Task can be assigned to many Users, and a User can have many Tasks (M:M) — using task_assignees join table


// P (1) : (M) T
// U (M) : (M) T   --> task_assignees (assign)
// U (1) : (M) T (create)
// U (1) : (M) P
