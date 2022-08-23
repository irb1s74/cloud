import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserCreateDto } from './dto/UserCreate.dto';
import { User } from './model/User.model';
import { Op } from 'sequelize';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async userCreate(dto: UserCreateDto) {
    return await this.userRepository.create(dto);
  }

  async findUser(nickname: string, userId: number) {
    return await this.userRepository.findAll({
      where: {
        [Op.and]: [
          { nickname: { [Op.like]: `%${nickname}%` } },
          { id: { [Op.not]: userId } },
        ],
      },
    });
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email: email } });
  }
}
