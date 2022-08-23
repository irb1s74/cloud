import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/find')
  create(@Body() dto: { nickname: string; userId: number }) {
    return this.userService.findUser(dto.nickname, dto.userId);
  }
}
