// user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Task } from './task.entity';
import { Project } from './project.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  // Each user can create many tasks
  @OneToMany(() => Task, (task) => task.createdBy)
  createdTasks: Task[];

  // A user can be assigned to many tasks (M:M)
  @ManyToMany(() => Task, (task) => task.assignees)
  @JoinTable({
    name: 'task_assignees',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'task_id', referencedColumnName: 'id' }
  })
  assignedTasks: Task[];

  // Each user can own many projects
  @OneToMany(() => Project, (project) => project.owner)
  ownedProjects: Project[];
}