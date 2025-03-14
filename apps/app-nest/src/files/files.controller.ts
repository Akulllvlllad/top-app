import { Controller, HttpCode, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { FileElementResponse } from './dto/file-element.response';
import { FilesService } from './files.service';
import { MFile } from './file.class';

@Controller('files')
export class FilesController {
    constructor(private readonly filesService: FilesService){

    }

    @Post('upload')
    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('files'))
    async uploadFile(@UploadedFile() file): Promise<FileElementResponse[]>{
        const saveArray: MFile[] = [new MFile(file)]
        if(file.mimetype.includes('image')){
            const webp = await this.filesService.convertToWebp(file.buffer) 
            saveArray.push(new MFile({ originalname: `${file.originalname.split('.')[0]}.webp`, buffer: webp }))  
        }
        return this.filesService.saveFiles(saveArray)
    }
}
