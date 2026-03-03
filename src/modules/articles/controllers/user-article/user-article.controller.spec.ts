import { Test, TestingModule } from '@nestjs/testing';
import { UserArticleController } from './user-article.controller';

describe('UserArticleController', () => {
  let controller: UserArticleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserArticleController],
    }).compile();

    controller = module.get<UserArticleController>(UserArticleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
