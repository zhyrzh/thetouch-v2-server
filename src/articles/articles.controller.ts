import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { AddArticleDto, UpdateArticleDto } from './dto';

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
  addArticle(@Body() articleBody: AddArticleDto) {
    return this.articlesService.addArticle(articleBody);
  }
  @Patch(':articleId')
  updateArticle(
    @Param('articleId', ParseIntPipe) articleId: number,
    @Body() articleBody: UpdateArticleDto,
  ) {
    return this.articlesService.updateArticle(articleId, articleBody);
  }
  @Delete(':articleId')
  deleteArticle(@Param('articleId', ParseIntPipe) articleId: number) {
    return this.articlesService.deleteArticle(articleId);
  }
}
