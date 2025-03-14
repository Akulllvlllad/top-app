import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '../auth/auth.module';
import { FilesModule } from '../files/files.module';
import { ProductModule } from '../product/product.module';
import { TopPageModule } from '../top-page/top-page.module';
import { ReviewModule } from '../review/review.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SitemapModule } from '../sitemap/sitemap.module';
@Module({
  imports: [
    FilesModule,
    AuthModule,
    ProductModule,
    TopPageModule,
    SitemapModule,
    ReviewModule,
    MongooseModule.forRoot(
      'mongodb+srv://vwinterdev:tCPByrKlp112Xxz9@cluster0.kaial.mongodb.net/test?retryWrites=true&w=majority'
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
