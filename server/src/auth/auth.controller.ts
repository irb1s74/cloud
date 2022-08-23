import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserLoginDto } from 'src/user/dto/UserLogin.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @UsePipes(ValidationPipe)
  login(@Body() dto: UserLoginDto) {
    return this.authService.login(dto);
  }
}
