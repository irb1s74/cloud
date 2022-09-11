import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Param,
  Post,
  Req,
  Res,
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

  @Post('/path')
  @UseGuards(AuthGuard)
  getFilesByPath(
    @Body() dto: { path: string; sort: string; option: boolean },
    @Req() req: Request
  ) {
    return this.fileService.getFilesByPath(dto.sort, dto.path, dto.option, req);
  }

  @Post('/create')
  @UseGuards(AuthGuard)
  create(@Req() req: Request, @Body() dto: { name: string; path?: string }) {
    return this.fileService.createDir(dto.name, dto.path, req);
  }

  @Post('/upload')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  update(
    @Req() req: Request,
    @UploadedFile() file,
    @Body() dto: { path?: string }
  ) {
    return this.fileService.uploadFile(file, dto.path, req);
  }

  @Get('/download/:id')
  @Header('Content-type', 'application/octet-stream')
  @UseGuards(AuthGuard)
  async downloadFile(@Param('id') fileId, @Req() req: Request, @Res() res) {
    const file = await this.fileService.downloadFile(fileId, req);
    if ('path' in file) {
      return res.download(file.path, file.fileName);
    }
    res.attachment(`filename.zip`);
    return res.send(file);
  }

  @Delete('/delete/:id')
  @UseGuards(AuthGuard)
  async deleteFile(@Param('id') fileId, @Req() req: Request) {
    return this.fileService.deleteFile(fileId, req);
  }
}
