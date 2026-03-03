import { IBaseResponse, IPaginatedResult } from '@shared/interfaces/http-response.interface';
import { CreateArticleDto } from '../dtos/create-article.dto';
import { PaginationDto } from '@shared/dtos/pagination.dto';
import { IArticleDetails, IListArticle } from './article.interface';

export interface IArticleService {
  create(createDto: CreateArticleDto, userId: string): Promise<IBaseResponse>;

  deleteOne(articleId: string): Promise<IBaseResponse>;

  findOneById(id: string): Promise<IArticleDetails>;

  findAll(pagination: PaginationDto, userId?: string): Promise<IPaginatedResult<IListArticle>>;
}
