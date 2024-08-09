import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAll(): Promise<{ data: { users: UserDto[] } }> {
    const users = await this.usersService.findAll();
    return { data: { users } };
  }

  // @Post('create')
  // async createUser(
  //   @Body('email') email: string,
  //   @Body('password') password: string,
  // ) {
  //   return await this.usersService.createUser(email, password);
  // }
}
