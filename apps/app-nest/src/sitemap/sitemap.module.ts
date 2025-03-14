import { Module } from '@nestjs/common';
import { SitemapController } from './sitemap.controller';
import { TopPageService } from '../top-page/top-page.service';

@Module({
  controllers: [SitemapController],
  providers: [TopPageService]
})
export class SitemapModule {}
