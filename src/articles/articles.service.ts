import { Injectable } from '@nestjs/common';

@Injectable()
export class ArticlesService {
  getAll() {
    return 'an array of articles less than or equal to 10';
  }
  getArticle(articleId: number) {
    return `an article with an id of ${articleId}`;
  }
  addArticle(articleBody) {
    return `add an article with a body of ${articleBody}`;
  }
  updateArticle(articleId) {
    return `updates an article with an id of ${articleId}`;
  }
  deleteArticle(articleId) {
    return `deletes an article with an id of ${articleId}`;
  }
}
