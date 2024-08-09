import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { plainToInstance } from 'class-transformer';
import { UserDto } from './user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async create(user: Partial<User>): Promise<User> {
    const newUser = this.usersRepository.create(user);
    return this.usersRepository.save(newUser);
  }

  async findAll(): Promise<UserDto[]> {
    const users = await this.usersRepository.find();
    return plainToInstance(UserDto, users, { excludeExtraneousValues: true });
  }

  // async createUser(email: string, password: string) {
  //   const supabase = this.supabaseService.getClient();
  //   const { data, error } = await supabase.auth.signUp({ email, password });

  //   if (error) {
  //     throw new Error(`Supabase sign-up error: ${error.message}`);
  //   }

  //   return data;
  // }
}
