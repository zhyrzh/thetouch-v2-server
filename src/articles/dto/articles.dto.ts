import { IsArray, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class ArticleDto {
  @IsNotEmpty()
  @IsString()
  headline: string;

  @IsNotEmpty()
  @IsString()
  body: string;

  @IsNotEmpty()
  @IsInt()
  author_id: number;

  @IsNotEmpty()
  @IsInt()
  graphics_artist_id: number;

  @IsNotEmpty()
  @IsArray()
  photos: Array<string>;
}
