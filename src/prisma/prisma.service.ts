import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          url: 'postgresql://postgres:sjcs2012AdminRhyz@localhost:5432/thetouch_dev_db?schema=public',
        },
      },
    });
  }
}
