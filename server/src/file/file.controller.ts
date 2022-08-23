import {
  Body,
  Controller,
  Get,
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

  @Post('/create')
  @UseGuards(AuthGuard)
  create(@Req() req: Request, @Body() dto: { name: string; parent?: number }) {
    return this.fileService.createDir(dto.name, dto.parent, req);
  }

  @Post('/upload')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  update(
    @Req() req: Request,
    @UploadedFile() file,
    @Body() dto: { parent?: number }
  ) {
    return this.fileService.uploadFile(file, dto.parent, req);
  }

  @Get('/download/:id')
  // @UseGuards(AuthGuard)
  async downloadFile(@Param('id') fileId, @Req() req: Request, @Res() res) {
    const file = await this.fileService.downloadFile(fileId, req);
    return res.download(file?.path, file?.fileName);
  }
}
