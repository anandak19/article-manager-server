import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { PaginationDto } from '@shared/dtos/pagination.dto';
import { ARTICLE_TOKEN } from '../article.token';
import type { IArticleService } from '../interfaces/article-services.interface';

@Controller('article')
export class ArticleController {
  constructor(@Inject(ARTICLE_TOKEN.ARTICLE_SERVICE) private _articleService: IArticleService) {}

  @Get()
  findAll(@Query() pagination: PaginationDto) {
    return this._articleService.findAll(pagination);
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this._articleService.findOneById(id);
  }
}
