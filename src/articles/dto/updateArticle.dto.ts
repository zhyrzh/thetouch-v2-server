import { IsArray, IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateArticleDto {
  @IsOptional()
  @IsString()
  createdAt?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  headline?: string;

  @IsOptional()
  @IsString()
  body?: string;

  @IsOptional()
  @IsInt()
  author_id?: number;

  @IsOptional()
  @IsInt()
  graphics_artist_id?: number;

  @IsOptional()
  @IsArray()
  removedPhotos?: Array<string>;

  @IsOptional()
  @IsArray()
  addedPhotos?: Array<string>;
}
