import { PaginationDto } from '@shared/dtos/pagination.dto';
import { CreateArticleDto } from '../dtos/create-article.dto';
import { ArticlesDocument } from '../schemas/articles.schema';
import { IPaginatedResult } from '@shared/interfaces/http-response.interface';
import { IArticleDetails, IListArticle } from './article.interface';

export interface IArticleRepository {
  create(createDto: CreateArticleDto, userId: string): Promise<ArticlesDocument>;

  findOneByTitle(title: string, userId: string): Promise<ArticlesDocument | null>;

  findOneById(id: string): Promise<IArticleDetails | null>;

  deleteOneById(id: string): Promise<boolean>;

  findAll(pagination: PaginationDto, userId?: string): Promise<IPaginatedResult<IListArticle>>;
}
