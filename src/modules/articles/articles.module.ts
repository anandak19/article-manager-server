import { Module } from '@nestjs/common';
import { ARTICLE_TOKEN } from './article.token';
import { ArticleService } from './services/article.service';
import { ArticleRepository } from './repositories/article.repository';
import { ArticleController } from './controllers/article.controller';
import { UserArticleController } from './controllers/user-article/user-article.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Articles, ArticlesSchema } from './schemas/articles.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Articles.name, schema: ArticlesSchema }])],
  controllers: [ArticleController, UserArticleController],
  providers: [
    { provide: ARTICLE_TOKEN.ARTICLE_SERVICE, useClass: ArticleService },
    { provide: ARTICLE_TOKEN.ARTICLE_REPOSITORY, useClass: ArticleRepository },
  ],
  exports: [ARTICLE_TOKEN.ARTICLE_SERVICE],
})
export class ArticlesModule {}
