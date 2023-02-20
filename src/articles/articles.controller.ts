import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { ArticlesService } from './articles.service';
import { AddArticleDto, UpdateArticleDto } from './dto';

@Controller('articles')
export class ArticlesController {
  constructor(private articlesService: ArticlesService) {}
  @Get('/')
  getArticlesForHomePage() {
    return this.articlesService.getArticlesForHomePage();
  }

  @Get('pagination/:skip')
  getAllArticles(@Param('skip', ParseIntPipe) skip: number) {
    return this.articlesService.getAllArticlesWithPagination(skip);
  }

  @Get(':articleId')
  getArticle(@Param('articleId') articleId: number) {
    return this.articlesService.getArticle(articleId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  addArticle(@Body() articleBody: AddArticleDto, @Req() req: Request) {
    console.log(req.user);
    return this.articlesService.addArticle(articleBody);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':articleId')
  updateArticle(
    @Param('articleId', ParseIntPipe) articleId: number,
    @Body() articleBody: UpdateArticleDto,
  ) {
    return this.articlesService.updateArticle(articleId, articleBody);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':articleId')
  deleteArticle(@Param('articleId', ParseIntPipe) articleId: number) {
    return this.articlesService.deleteArticle(articleId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('/approve/:articleId')
  approveArticle(@Param('articleId', ParseIntPipe) articleId: number) {
    return this.articlesService.approveArticle(articleId);
  }
}
