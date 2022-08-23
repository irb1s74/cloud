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
        file.parentId = parent;
        this.createFile(file);
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
        file.destroy();
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

  async uploadFile(files, parentId, req) {
    try {
      const file = files;
      const parent = await this.fileRepository.findOne({
        where: {
          userId: req.user.id,
          id: parentId,
        },
      });
      const user = await this.userRepository.findByPk(req.user.id);

      //check user diskSpace
      if (user.usedSpace + file.size > user.diskSpace) {
        return new HttpException(
          'There no space on the disk',
          HttpStatus.BAD_REQUEST
        );
      }

      user.usedSpace = user.usedSpace + file.size;

      let checkFilePath;
      if (parent) {
        checkFilePath = `${path.resolve(__dirname, '..', 'static/files')}\\${
          user.id
        }\\${parent.path}\\${file.originalname}`;
      } else {
        checkFilePath = `${path.resolve(__dirname, '..', 'static/files')}\\${
          user.id
        }\\${file.originalname}`;
      }

      if (fs.existsSync(checkFilePath)) {
        return new HttpException('File already exist', HttpStatus.BAD_REQUEST);
      }
      fs.writeFileSync(checkFilePath, file.buffer);

      const type = file.originalname.split('.').pop();
      let filePath = file.originalname;
      if (parent) {
        filePath = parent.path + '\\' + file.originalname;
      }

      const dbFile = await this.fileRepository.create({
        name: file.originalname,
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
      throw new HttpException(`Error upload file ${e}`, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteFile(file) {
    const path = this.getPath(file);
    if (file.type === 'dir') {
      fs.rmdirSync(path);
    } else {
      fs.unlinkSync(path);
    }
  }

  async downloadFile(fileId, req): Promise<{ path: string; fileName: string }> {
    try {
      const file = await this.fileRepository.findOne({
        where: { id: fileId },
      });
      const path = this.getPath(file);
      if (fs.existsSync(path)) {
        // return readFileSync(path);
        return { path, fileName: file.name };
      }
      new HttpException(`File not found`, HttpStatus.NOT_FOUND);
    } catch (e) {
      throw new HttpException(`Download error ${e}`, HttpStatus.BAD_REQUEST);
    }
  }
}
