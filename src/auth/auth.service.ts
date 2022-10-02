import { Injectable, NotAcceptableException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}
  async login(body: AuthDto) {
    const isUsernameExisting = await this.prisma.admin.findUnique({
      where: {
        username: body.username,
      },
    });

    if (!isUsernameExisting) {
      throw new NotAcceptableException('Invalid Credentials');
    }

    const isPasswordMatched = await argon.verify(
      isUsernameExisting.password,
      body.password,
    );

    if (!isPasswordMatched) {
      throw new NotAcceptableException('Invalid Credentials');
    }

    return this.signToken(isUsernameExisting.username);
  }

  async signup(body: AuthDto) {
    const isUsernameExisting = await this.prisma.admin.findUnique({
      where: {
        username: body.username,
      },
    });

    if (isUsernameExisting) {
      throw new NotAcceptableException('Username Already Exists');
    }

    const hashedPassword = await argon.hash(body.password);

    const createdAdmin = await this.prisma.admin.create({
      data: {
        password: hashedPassword,
        username: body.username,
      },
    });

    return this.signToken(createdAdmin.username);
  }

  async signToken(username: string) {
    const token = await this.jwt.signAsync(
      { username },
      {
        expiresIn: 7200,
        secret: 'long-secret-123',
      },
    );
    return {
      access_token: token,
    };
  }
}
