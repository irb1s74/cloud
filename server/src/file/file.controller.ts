import {
  Body,
  Controller,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '../guards/auth.guard';
import { Request } from 'express';

@Controller('file')
export class FileController {
  constructor(private fileService: FileService) {}

  @Post('/create')
  @UseGuards(AuthGuard)
  create(@Req() req: Request, @Body() dto: { name: string; parent?: number }) {
    return this.fileService.createDir(dto.name, dto.parent, req);
  }

  @Post('/update')
  @UseInterceptors(FileInterceptor('file'))
  update(
    @UploadedFile() file,
    @Body() dto: { parent?: number; userId: number }
  ) {
    return this.fileService.uploadFile(file, dto.userId, dto.parent);
  }
}
