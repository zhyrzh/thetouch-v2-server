import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { cloudinary } from '../utils/cloudinary';

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}
  async getAll() {
    return 'an array of articles less than or equal to 10';
  }
  getArticle(articleId: number) {
    return `an article with an id of ${articleId}`;
  }
  async addArticle(articleBody) {
    const photos: Array<string> = articleBody.photos;
    delete articleBody.photos;
    const { id } = await this.prisma.article.create({
      data: articleBody,
    });
    for (const photo of photos) {
      const { public_id } = await cloudinary.uploader.upload(photo, {
        upload_preset: 'uu8ywkkv',
      });
      await this.prisma.$transaction([
        this.prisma.photo.create({
          data: {
            url: public_id,
            article_id: id,
          },
        }),
      ]);
    }

    return id;
  }
  updateArticle(articleId) {
    return `updates an article with an id of ${articleId}`;
  }
  deleteArticle(articleId) {
    return `deletes an article with an id of ${articleId}`;
  }
}
