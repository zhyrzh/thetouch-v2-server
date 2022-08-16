import { Injectable, NotFoundException } from '@nestjs/common';
import { cloudinary } from '../utils/cloudinary';
import { PrismaService } from '../prisma/prisma.service';
import { AddJournalistDto, UpdateJournalistDto } from './dto';

@Injectable()
export class JournalistsService {
  constructor(private prisma: PrismaService) {}
  // GET all journalists
  async getAllJournalist() {
    return await this.prisma.journalist.findMany();
  }
  // GET spcific journalist
  async getJournalist(journalistId) {
    const foundJournalist = await this.prisma.journalist.findUnique({
      where: {
        id: journalistId,
      },
    });
    if (!foundJournalist) {
      throw new NotFoundException("Journalist doesn't exist");
    }
    return foundJournalist;
  }
  // POST AddJournalist Service
  async addJournalist(journalistBody: AddJournalistDto) {
    const { public_id } = await cloudinary.uploader.upload(
      journalistBody.photo,
      {
        upload_preset: 'uu8ywkkv',
      },
    );
    const journalistData = {
      ...journalistBody,
      photo: public_id,
    };
    const addedJournalist = await this.prisma.journalist.create({
      data: journalistData,
    });
    return addedJournalist;
  }
  // DELETE Journalist
  async deleteJournalist(journalistId: number) {
    const { id } = await this.prisma.journalist.delete({
      where: {
        id: journalistId,
      },
    });
    return id;
  }
  // PATCH a journalist
  async updateJournalist(journalistId: number, body: UpdateJournalistDto) {
    let data: UpdateJournalistDto = {};
    if (body.photo.length) {
      const { public_id } = await cloudinary.uploader.upload(body.photo, {
        upload_preset: 'uu8ywkkv',
      });
      data = {
        ...data,
        photo: public_id,
      };
    } else {
      data = {
        ...data,
      };
    }
    const udpatedJournalist = await this.prisma.journalist.update({
      where: {
        id: journalistId,
      },
      data: {
        ...data,
      },
    });
    return udpatedJournalist;
  }
}
