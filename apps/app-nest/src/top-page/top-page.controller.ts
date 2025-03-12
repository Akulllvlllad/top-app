import {
  Body,
  Controller,
  Param,
  Post,
  Get,
  Delete,
  Patch,
  HttpCode,
  UsePipes,
  ValidationPipe,
  NotFoundException,
} from '@nestjs/common';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { TopPageService } from './top-page.service';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { IdValidationPipe } from '../pipes/id-validation.pipe';
import { PAGE_NOT_EXIST } from './top-page.constants';

@Controller('top-page')
export class TopPageController {
  constructor(private readonly topPageService: TopPageService) {}
  @Post('create')
  async create(@Body() dto: CreateTopPageDto) {
    return await this.topPageService.create(dto);
  }

  @UsePipes(new ValidationPipe())
  @Get(':id')
  async get(@Param('id', IdValidationPipe) id: string) {
    const page = await this.topPageService.findById(id);
    if (!page) {
      throw new NotFoundException(PAGE_NOT_EXIST);
    }
    return page;
  }

  @Get('byAlias/:id')
  async getByAlias(@Param('alisa') alias: string) {
    const page = await this.topPageService.findByAlias(alias);
    if (!page) {
      throw new NotFoundException(PAGE_NOT_EXIST);
    }
    return page;
  }

  @UsePipes(new ValidationPipe())
  @Delete(':id')
  async delete(@Param('id', IdValidationPipe) id: string) {
    const page = await this.topPageService.deleteById(id);
    if (!page) {
      throw new NotFoundException(PAGE_NOT_EXIST);
    }
  }

  @Patch(':id')
  async patch(@Param('id') id: string, @Body() dto: CreateTopPageDto) {
    const updatedPage = await this.topPageService.updateById(id, dto);
    if (!updatedPage) {
      throw new NotFoundException(PAGE_NOT_EXIST);
    }
    return updatedPage;
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  async find(@Body() dto: FindTopPageDto) {
    return await this.topPageService.findByCategory(dto.firstCategory);
  }
}
