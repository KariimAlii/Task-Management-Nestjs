// src/users/mock-user.service.ts
import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';


@Injectable()
export class MockUserService {
  private readonly mockUser: User = {
    id: '00000000-0000-0000-0000-000000000001',
    username: 'mockuser',
    email: 'mock@example.com',
    password: '', // Not needed for mock
    createdTasks: [],
    assignedTasks: [],
    ownedProjects: []
  };

  getMockUser(): User {
    return this.mockUser;
  }
}