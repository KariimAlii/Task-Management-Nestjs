import { DataSource, Repository } from 'typeorm';
import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { AuthCredentialsDto } from '../dtos/auth-credentials-dto';
import { User } from '../../tasks/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository {
  private repo: Repository<User>;
  constructor(private readonly dataSource: DataSource) {
    this.repo = dataSource.getRepository(User);
  }

  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password, email } = authCredentialsDto;

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password,salt)

    const user = this.repo.create({ username, password: hashedPassword, email });

    try {
      await this.repo.save(user);
    } catch (err) {
      console.log(`ERROR SAVING USER ${err.code} => ${err.message}`);
      if(err.code === '23505') {
        console.log(`ERROR SAVING USER => Duplicate UserName or Email`);
        throw new ConflictException('Username or Email already exists');
      } else {
        throw new InternalServerErrorException(err.message);
      }

    }

  }

  async findUserByUsername(username: string): Promise<User | null> {
    return this.repo.findOneBy( { username } );
  }
}