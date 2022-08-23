import { IsString } from 'class-validator';

export class UserLoginDto {
  @IsString({ message: 'Должен быть строкой' })
  readonly token: string;
}
