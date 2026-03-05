import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Articles, ArticlesDocument } from '../schemas/articles.schema';
import { _QueryFilter, Model, PipelineStage, Types } from 'mongoose';
import {
  IArticleDetails,
  ICreateArticle,
  IFindAllRepoRes,
  IListArticle,
  IUpdateArticle,
} from '../interfaces/article.interface';
import { CreateArticleDto } from '../dtos/create-article.dto';
import { IArticleRepository } from '../interfaces/article-repository.interface';
import { PaginationDto } from '@shared/dtos/pagination.dto';
import { IPaginatedResult } from '@shared/interfaces/http-response.interface';

@Injectable()
export class ArticleRepository implements IArticleRepository {
  defaultPage = 1;
  defaultLimit = 10;
  constructor(@InjectModel(Articles.name) private _articleModel: Model<Articles>) {}

  async create(data: CreateArticleDto, userId: string): Promise<ArticlesDocument> {
    const articleData: ICreateArticle = {
      ...data,
      userId: new Types.ObjectId(userId),
    };

    const newArticle = await this._articleModel.create(articleData);
    return newArticle.save();
  }

  async findOneById(id: string): Promise<IArticleDetails | null> {
    const [res] = await this._articleModel.aggregate<IArticleDetails>([
      {
        $match: {
          isDeleted: false,
          _id: new Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'userDetails',
        },
      },
      {
        $unwind: '$userDetails',
      },
      {
        $project: {
          id: {
            $toString: '$_id',
          },
          _id: 0,
          title: 1,
          content: 1,
          writerName: {
            $concat: ['$userDetails.firstName', ' ', '$userDetails.lastName'],
          },
          createdAt: 1,
        },
      },
    ]);

    return res ?? null;
  }

  async findAll(
    pagination: PaginationDto,
    userId?: string,
  ): Promise<IPaginatedResult<IListArticle>> {
    const { page = this.defaultPage, limit = this.defaultLimit } = pagination;
    const skip = (page - 1) * limit;

    const matchStageObj: _QueryFilter<ArticlesDocument> = {
      isDeleted: false,
    };

    if (userId) {
      matchStageObj.userId = new Types.ObjectId(userId);
    }

    const paginationStage: PipelineStage.FacetPipelineStage[] = [
      {
        $sort: { createdAt: -1 },
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'userDetails',
        },
      },
      {
        $unwind: '$userDetails',
      },
      {
        $project: {
          id: {
            $toString: '$_id',
          },
          _id: 0,
          title: 1,
          writerName: {
            $concat: ['$userDetails.firstName', ' ', '$userDetails.lastName'],
          },
          createdAt: 1,
        },
      },
    ];

    const [res] = await this._articleModel.aggregate<IFindAllRepoRes>([
      {
        $match: matchStageObj,
      },
      {
        $facet: {
          docs: paginationStage,
          total: [{ $count: 'count' }],
        },
      },
    ]);

    const total = res.total[0].count;

    return {
      documents: res.docs,
      meta: {
        limit,
        total,
        page,
        pages: Math.ceil(total / limit) || 0,
      },
    };
  }

  async findOneByTitle(
    title: string,
    userId: string,
    articleId?: string,
  ): Promise<ArticlesDocument | null> {
    const filterQuery: _QueryFilter<ArticlesDocument> = {
      isDeleted: false,
      title,
      userId: new Types.ObjectId(userId),
    };

    if (articleId) {
      filterQuery._id = { $ne: new Types.ObjectId(articleId) };
    }

    return this._articleModel
      .findOne(filterQuery)
      .populate('userId', 'firstName lastName email')
      .exec();
  }

  async updateById(articleId: string, update: IUpdateArticle): Promise<ArticlesDocument | null> {
    return await this._articleModel.findByIdAndUpdate(articleId, update, {
      returnDocument: 'after',
    });
  }

  async deleteOneById(id: string): Promise<boolean> {
    const res = await this._articleModel.findByIdAndUpdate(id, {
      isDeleted: true,
    });
    return !!res;
  }
}
