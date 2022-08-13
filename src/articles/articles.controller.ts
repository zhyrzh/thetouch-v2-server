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
    return this.articlesService.getAll();
  }
  @Get(':articleId')
  getArticle(@Param('articleId') articleId: number) {
    return this.articlesService.getArticle(articleId);
  }
  @Post()
  addArticle(@Body() articleBody) {
    return this.articlesService.addArticle(articleBody);
  }
  @Patch()
  updateArticle(@Param('articleId') articleId: number) {
    return this.articlesService.updateArticle(articleId);
  }
  @Delete()
  deleteArticle(@Param('articleId') articleId: number) {
    return this.articlesService.deleteArticle(articleId);
  }
}
