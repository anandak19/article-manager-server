import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { IArticleService } from '../interfaces/article-services.interface';
import { IBaseResponse, IPaginatedResult } from '@shared/interfaces/http-response.interface';
import { CreateArticleDto } from '../dtos/create-article.dto';
import { ARTICLE_TOKEN } from '../article.token';
import type { IArticleRepository } from '../interfaces/article-repository.interface';
import { PaginationDto } from '@shared/dtos/pagination.dto';
import { IArticleDetails, IListArticle } from '../interfaces/article.interface';
import { UpdateArticleDto } from '../dtos/update-article.dto';

@Injectable()
export class ArticleService implements IArticleService {
  constructor(@Inject(ARTICLE_TOKEN.ARTICLE_REPOSITORY) private _articleRepo: IArticleRepository) {}

  async create(createDto: CreateArticleDto, userId: string): Promise<IBaseResponse> {
    const existing = await this._articleRepo.findOneByTitle(createDto.title, userId);

    if (existing) {
      throw new ConflictException('You already have an article with this title');
    }

    const saved = await this._articleRepo.create(createDto, userId);
    if (!saved) {
      throw new InternalServerErrorException('Faild to save article');
    }

    return { message: 'Article Saved' };
  }

  async deleteOne(articleId: string): Promise<IBaseResponse> {
    const isDeleted = await this._articleRepo.deleteOneById(articleId);
    if (!isDeleted) {
      throw new InternalServerErrorException('Faild to delete');
    }

    return { message: 'Article Deleted' };
  }

  findAll(pagination: PaginationDto, userId?: string): Promise<IPaginatedResult<IListArticle>> {
    return this._articleRepo.findAll(pagination, userId);
  }

  async findOneById(id: string): Promise<IArticleDetails> {
    const res = await this._articleRepo.findOneById(id);
    if (!res) {
      throw new NotFoundException('Article Not Found');
    }
    return res;
  }

  async updateById(
    userId: string,
    articleId: string,
    update: UpdateArticleDto,
  ): Promise<IArticleDetails> {
    // check if the article with title exists
    if (update.title) {
      const existing = await this._articleRepo.findOneByTitle(update.title, userId, articleId);
      if (existing) {
        throw new ConflictException('You already have an article with this title');
      }
    }

    const updated = await this._articleRepo.updateById(articleId, update);

    if (!updated) {
      throw new InternalServerErrorException('Article not found! Update faild');
    }

    return this.findOneById(updated._id.toString());
  }
}
