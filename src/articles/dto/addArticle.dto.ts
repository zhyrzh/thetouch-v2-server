import { Transform } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class AddArticleDto {
  @IsNotEmpty()
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsString()
  headline: string;

  @IsNotEmpty()
  @IsString()
  body: string;

  @IsNotEmpty()
  @IsString()
  graphics_by: string;

  @IsNotEmpty()
  @IsString()
  authored_by: string;

  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  author_id: number;

  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  graphics_artist_id: number;

  @IsNotEmpty()
  @IsArray()
  photos: Array<string>;
}
