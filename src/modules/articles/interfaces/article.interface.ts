import { Types } from 'mongoose';

export interface ICreateArticle {
  title: string;
  content: string;
  userId: Types.ObjectId;
}

export interface IArticle extends Omit<ICreateArticle, 'userId'> {
  id: string;
  userId: string;
  createdAt: string;
}

export type IUpdateArticle = Partial<Pick<IArticle, 'title' | 'content'>>;

export interface IListArticle extends Pick<IArticle, 'title' | 'id' | 'createdAt'> {
  writerName: string;
}

export interface IArticleDetails extends IListArticle {
  content: string;
}

export interface IFindAllRepoRes {
  docs: IListArticle[];
  total: { count: number }[];
}
