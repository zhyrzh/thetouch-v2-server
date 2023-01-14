import { Injectable, NotFoundException } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { cloudinary } from 'src/utils/cloudinary';
import { PrismaService } from '../prisma/prisma.service';
import { AddArticleDto, UpdateArticleDto } from './dto';
// import { cloudinary } from '../utils/cloudinary';

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}

  async getArticlesForHomePage() {
    const articles = await this.prisma.article.findMany({
      include: {
        photos: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
      take: 4,
    });
    return articles;
  }

  // GET all articles with LIMIT = 10
  async getAllArticlesWithPagination(skip) {
    const articles = await this.prisma.article.findMany({
      include: {
        photos: true,
      },
      skip,
      take: 10,
    });
    return articles;
  }

  // GET a specific article
  async getArticle(articleId: number) {
    const foundArticle = await this.prisma.article.findUnique({
      where: {
        id: articleId,
      },
    });

    if (foundArticle === null) {
      throw new NotFoundException('No user found');
    }

    return foundArticle;
  }

  // POST a new article
  async addArticle(articleBody: AddArticleDto) {
    const uploadedPhotos: Array<{ url: string; public_id: string }> = [];
    for (const photo of articleBody.photos) {
      const res = await cloudinary.uploader.upload(photo, {
        upload_preset: 'uu8ywkkv',
      });
      uploadedPhotos.push({ url: res.url, public_id: res.public_id });
    }

    const transformedUploadedPhotos = uploadedPhotos.map(
      ({ public_id, url }) => ({
        url,
        public_id,
      }),
    );

    const body = {
      ...articleBody,
      createdAt: dayjs(articleBody.createdAt).format(),
    };
    delete articleBody.photos;

    const createdPost = await this.prisma.article.create({
      data: {
        ...body,
        photos: {
          createMany: {
            data: [...transformedUploadedPhotos],
          },
        },
      },
    });

    return createdPost;
  }

  // PATCH updates an article
  async updateArticle(articleId, articleBody: UpdateArticleDto) {
    const addedPhotosLength = articleBody.addedPhotos.length;
    const removedPhotoIds = articleBody.removedPhotos.map((photo) => photo.id);

    if (articleBody.removedPhotos.length >= 1) {
      for (const photo of articleBody.removedPhotos) {
        await cloudinary.uploader.destroy(photo.url, (result) => {
          console.log(`Photo successfully deleted ${result}`);
        });
      }
    }

    const uploadedPhotos: Array<{ url: string; public_id: string }> = [];
    if (articleBody.addedPhotos.length >= 1) {
      let toBeUploadedPhotos: Array<{ url: string }> = [];
      if (articleBody.addedPhotos.length >= 1) {
        toBeUploadedPhotos = articleBody.addedPhotos.map((photo) => ({
          url: photo,
        }));
        for (const photo of toBeUploadedPhotos) {
          try {
            const res = await cloudinary.uploader.upload(photo.url, {
              upload_preset: 'uu8ywkkv',
            });
            uploadedPhotos.push({ url: res.url, public_id: res.public_id });
          } catch (error) {
            console.log('hitted, 2');
          }
        }
      }
    }

    delete articleBody.addedPhotos;
    delete articleBody.removedPhotos;
    try {
      await this.prisma.$transaction([
        this.prisma.articlePhotos.deleteMany({
          where: {
            url: {
              in: removedPhotoIds,
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
                data: [...uploadedPhotos],
              },
            },
          },
        }),
      ]);
    } catch (error) {
      console.log('hitted, 3');
    }

    return `updates an article with an id of ${articleId}`;
  }
  // DELETE an article
  async deleteArticle(articleId) {
    const [toBeDeletedPhotos, deletedArticle] = await this.prisma.$transaction([
      this.prisma.articlePhotos.findMany({
        where: {
          article_id: articleId,
        },
        select: {
          url: true,
        },
      }),
      this.prisma.article.delete({
        where: {
          id: articleId,
        },
      }),
      this.prisma.articlePhotos.deleteMany({
        where: {
          article_id: articleId,
        },
      }),
    ]);

    for (const photo of toBeDeletedPhotos) {
      await cloudinary.uploader.destroy(photo.url, (result) => {
        console.log(`Photo successfully deleted ${result}`);
      });
    }

    return deletedArticle;
  }
}
