import { IPayload } from '@modules/users/interfaces/users.interface';
import { CreateArticleDto } from './create-article.dto';

export class ArticleDto extends CreateArticleDto {
  id: string;
  user: IPayload;
}
