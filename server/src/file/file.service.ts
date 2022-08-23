import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { File } from './model/File.model';
import { User } from '../user/model/User.model';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class FileService {
  constructor(
    @InjectModel(File) private fileRepository: typeof File,
    @InjectModel(User) private userRepository: typeof User
  ) {}

  async createDir(name: string, parent: number, req) {
    try {
      const file = await this.fileRepository.create({
        name,
        type: 'dir',
        userId: req.user.id,
      });
      const parentFile = await this.fileRepository.findByPk(parent);
      if (parentFile) {
        file.path = `${parentFile.path}\\${file.name}`;
        this.createFile(file);
        file.parentId = parent;
        await parentFile.save();
      } else {
        file.path = name;
        this.createFile(file);
      }
      await file.save();
      return file;
    } catch (e) {
      throw new HttpException(`Create dir error ${e}`, HttpStatus.BAD_REQUEST);
    }
  }

  createFile(file: File) {
    const filePath = this.getPath(file);
    try {
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      } else {
        throw new HttpException('File already exist', HttpStatus.BAD_REQUEST);
      }
    } catch (e) {
      throw new HttpException(`Create file error ${e}`, HttpStatus.BAD_REQUEST);
    }
  }

  getPath(file: File) {
    return (
      path.resolve(__dirname, '..', 'static/files') +
      '\\' +
      file.userId +
      '\\' +
      file.path
    );
  }

  async uploadFile(files, userId, parentId) {
    try {
      const file = files;

      const parent = await this.fileRepository.findOne({
        where: {
          userId: userId,
          id: parentId,
        },
      });
      const user = await this.userRepository.findByPk(userId);

      if (user.usedSpace + file.size > user.diskSpace) {
        return new HttpException(
          'There no space on the disk',
          HttpStatus.BAD_REQUEST
        );
      }

      user.usedSpace = user.usedSpace + file.size;

      let path;
      if (parent) {
        path = `${path.resolve(__dirname, 'files')}\\${user.id}\\${
          parent.path
        }\\${file.name}`;
      } else {
        path = `${path.resolve(__dirname, 'files')}\\${user.id}\\${file.name}`;
      }

      if (fs.existsSync(path)) {
        return new HttpException('File already exist', HttpStatus.BAD_REQUEST);
      }
      file.mv(path);

      const type = file.name.split('.').pop();
      let filePath = file.name;
      if (parent) {
        filePath = parent.path + '\\' + file.name;
      }

      const dbFile = await this.fileRepository.create({
        name: file.name,
        type,
        userId: user.id,
      });
      dbFile.size = file.size;
      dbFile.path = filePath;
      dbFile.parentId = parent ? parent.id : null;

      await dbFile.save();
      await user.save();

      return dbFile;
    } catch (e) {
      throw new HttpException('Error upload file', HttpStatus.BAD_REQUEST);
    }
  }

  async deleteFile(file) {
    const path = await this.getPath(file);
    if (file.type === 'dir') {
      fs.rmdirSync(path);
    } else {
      fs.unlinkSync(path);
    }
  }
}
