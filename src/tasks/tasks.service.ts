import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  private tasks = [
    {id: 1, name: 'Task 1'},
    {id: 2, name: 'Task 2'},
    {id: 3, name: 'Task 3'},
  ];

  getAllTasks() {
    return this.tasks;
  }
}
