import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class ArticleDto {
  @IsNotEmpty()
  @IsString()
  headline: string;

  @IsNotEmpty()
  @IsString()
  body: string;

  @IsNotEmpty()
  @IsString()
  writer: string;

  @IsString()
  graphicsArtist: string;

  @IsNotEmpty()
  @IsString()
  createdAt: string;

  @IsNotEmpty()
  @IsArray()
  photos: Array<string>;
}
