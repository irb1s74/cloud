import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './model/User.model';
import { UserController } from './user.controller';

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports: [SequelizeModule.forFeature([User])],
  exports: [UserService],
})
export class UserModule {}
