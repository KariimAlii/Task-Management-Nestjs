import { DataSource, Repository } from 'typeorm';
import { User } from '../entities/user.entity';


export class UserRepository {
  private repo: Repository<User>;
  constructor(private readonly dataSource: DataSource) {
    this.repo = dataSource.getRepository(User);
  }
}