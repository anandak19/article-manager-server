import { AuthGuard } from '@core/guards/auth.guard';
import { ARTICLE_TOKEN } from '@modules/articles/article.token';
import { CreateArticleDto } from '@modules/articles/dtos/create-article.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { IAuthenticatedRequest } from '@shared/interfaces/common.interface';
import type { IArticleService } from '@modules/articles/interfaces/article-services.interface';
import { PaginationDto } from '@shared/dtos/pagination.dto';
import { UpdateArticleDto } from '@modules/articles/dtos/update-article.dto';

@UseGuards(AuthGuard)
@Controller('user/article')
export class UserArticleController {
  constructor(@Inject(ARTICLE_TOKEN.ARTICLE_SERVICE) private _articleService: IArticleService) {}

  @Post()
  create(@Body() createDto: CreateArticleDto, @Req() req: IAuthenticatedRequest) {
    return this._articleService.create(createDto, req.user.id);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this._articleService.deleteOne(id);
  }

  @Get()
  findAll(@Req() req: IAuthenticatedRequest, @Query() query: PaginationDto) {
    return this._articleService.findAll(query, req.user.id);
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this._articleService.findOneById(id);
  }

  @Patch(':id')
  updateById(
    @Req() req: IAuthenticatedRequest,
    @Param('id') id: string,
    @Body() body: UpdateArticleDto,
  ) {
    return this._articleService.updateById(req.user.id, id, body);
  }
}
