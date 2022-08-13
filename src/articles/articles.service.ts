import { Injectable } from '@nestjs/common';

@Injectable()
export class ArticlesService {
  getAll() {
    return 'an array of articles less than or equal to 10';
  }
  getArticle(articleId: number) {
    return 'an article with a spcific id';
  }
  addArticle(body) {
    return 'adds an article';
  }
  updateArticle(body) {
    return 'updtes an article';
  }
  deleteArticle(body) {
    return 'deletes an article';
  }
}
