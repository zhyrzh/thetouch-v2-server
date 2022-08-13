import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';

@Controller('articles')
export class ArticlesController {
  constructor(private articlesService: ArticlesService) {}
  @Get()
  getAll() {
    return 'All Articles';
  }
  @Get()
  getArticle(@Param('articleId') articleId: number) {
    return 'an article with a spcific id';
  }
  @Post()
  addArticle(@Body() articleBody) {
    return 'adds an article';
  }
  @Patch()
  updateArticle(@Param('articleId') articleId: number) {
    return 'updtes an article';
  }
  @Delete()
  deleteArticle(@Param('articleId') articleId: number) {
    return 'deletes an article';
  }
}
