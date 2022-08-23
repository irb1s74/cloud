import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { File } from './model/File.model';
import { User } from '../user/model/User.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [FileController],
  providers: [FileService],
  imports: [
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET_DEV',
      signOptions: {
        expiresIn: '12h',
      },
    }),
    SequelizeModule.forFeature([File, User]),
  ],
})
export class FileModule {}
