import { Injectable } from '@nestjs/common';
import { format } from 'date-fns'
import { FileElementResponse } from './dto/file-element.response';
import { path } from 'app-root-path'
import { ensureDir, writeFile } from 'fs-extra'
import sharp from 'sharp'
import { MFile } from './file.class';

@Injectable()
export class FilesService {
    async saveFiles(files: MFile[]): Promise<FileElementResponse[]>{
        const dateFolder = format(new Date(), 'yyyy-MM-dd')
        const uploadFolder = `${path}/uploads/${dateFolder}`
        await ensureDir(uploadFolder)
        const response: FileElementResponse[] = []
        for(const file of files){
            await writeFile(`${uploadFolder}/${file.originalname}`, file.buffer)
            response.push({ url: `${dateFolder}/${file.originalname}`, name: file.originalname })
        }
        return response
    }

    async convertToWebp(file: Buffer): Promise<Buffer> {
        return sharp(file).webp().toBuffer()
    }
}
