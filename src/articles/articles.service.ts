import { Injectable } from '@nestjs/common';
import { cloudinary } from 'src/utils/cloudinary';
import { PrismaService } from '../prisma/prisma.service';
import { AddArticleDto } from './dto';
// import { cloudinary } from '../utils/cloudinary';

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}
  async getAll() {
    return 'an array of articles less than or equal to 10';
  }
  // GET a specific article
  getArticle(articleId: number) {
    return `an article with an id of ${articleId}`;
  }
  // POST a new article
  async addArticle(articleBody: AddArticleDto) {
    const uploadedPhotos: string[] = [];
    for (const photo of articleBody.photos) {
      const { public_id } = await cloudinary.uploader.upload(photo, {
        upload_preset: 'uu8ywkkv',
      });
      uploadedPhotos.push(public_id);
    }
    const transformedUploadedPhotos = uploadedPhotos.map((photo) => ({
      url: photo,
    }));
    delete articleBody.photos;

    const createdPost = await this.prisma.article.create({
      data: {
        ...articleBody,
        photos: {
          createMany: {
            data: [...transformedUploadedPhotos],
          },
        },
      },
    });

    return createdPost;
  }
  updateArticle(articleId) {
    return `updates an article with an id of ${articleId}`;
  }
  deleteArticle(articleId) {
    return `deletes an article with an id of ${articleId}`;
  }
}
