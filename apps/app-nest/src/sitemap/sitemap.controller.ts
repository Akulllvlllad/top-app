import { Controller, Get, Header } from '@nestjs/common';
import { TopPageService } from '../top-page/top-page.service';
import { ConfigService } from '@nestjs/config';
import { Builder } from 'xml2js'
import { addDays, format } from 'date-fns'
@Controller('sitemap')
export class SitemapController {
    domain: string;
    constructor(
        private readonly topPageService: TopPageService,
        private readonly configService: ConfigService
    ){
        this.domain = configService.get<string>('DOMAIN') ?? ''
    }

    @Get('xml')
    @Header('content-type', 'text/xml')
    sitemap() {
        const formatString = "yyyy-MM-dd'T'HH:mm:00.000xxx"
        let res = [{
            loc: `${this.domain}/`,
            lastmod: format(addDays(new Date(), -1), formatString),
            changefreq: 'daily',
            priority: '1.0'
        }]
        const builder = new Builder({
            xmldec: { version: '1.0', encoding: 'UTF-8' },
            standalone: true
        })

        return builder.buildObject({
            'urlset': {
                $: {
                    'xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9',
                    'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
                    'xsi:schemaLocation': 'http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd'
                },
                url: res
            }
        })
    }
}
