import { Injectable } from '@nestjs/common';
import { cloudinary } from 'src/utils/cloudinary';
import { PrismaService } from '../prisma/prisma.service';
import { AddArticleDto, UpdateArticleDto } from './dto';
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
  async updateArticle(articleId, articleBody: UpdateArticleDto) {
    // removedPhotos property -> Array
    // addedPhotos property -> Array
    const addedPhotosLength = articleBody.addedPhotos.length;
    const removedPhotos = articleBody.removedPhotos;
    for (const photo of articleBody.removedPhotos) {
      await cloudinary.uploader.destroy(photo, (result) => {
        console.log(`Photo successfully deleted ${result}`);
      });
    }
    let toBeUploadedPhotos: Array<{ url: string }> = [];
    if (articleBody.addedPhotos.length >= 1) {
      toBeUploadedPhotos = articleBody.addedPhotos.map((photo) => ({
        url: photo,
      }));
    }
    delete articleBody.addedPhotos;
    delete articleBody.removedPhotos;
    await this.prisma.$transaction([
      this.prisma.articlePhotos.deleteMany({
        where: {
          url: {
            in: removedPhotos,
          },
        },
      }),
      this.prisma.article.update({
        include: {
          photos: addedPhotosLength >= 1,
        },
        where: {
          id: articleId,
        },
        data: {
          ...articleBody,
          photos: {
            createMany: {
              data: [...toBeUploadedPhotos],
            },
          },
        },
      }),
    ]);

    return `updates an article with an id of ${articleId}`;
  }
  deleteArticle(articleId) {
    return `deletes an article with an id of ${articleId}`;
  }
}
