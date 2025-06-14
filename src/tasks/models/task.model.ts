import { ApiProperty } from '@nestjs/swagger';
import { Task } from '../entities/task.entity';

export class TaskVM {
  @ApiProperty()
  id: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  status: TaskStatus;

  static from(task: Task): TaskVM {
    const vm = new TaskVM();
    vm.id = task.id;
    vm.title = task.title;
    vm.description = task.description;
    vm.status = task.status;
    return vm;
  }
}

export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}