import {
  IsArray,
  IsDateString,
  IsMilitaryTime,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
// import { Artist } from 'src/artists/artist.entity';

export class CreateSongDTO {
  @IsString()
  @IsNotEmpty()
  title;
  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  artists;
  @IsNotEmpty()
  @IsDateString()
  releasedDate: Date;
  @IsMilitaryTime()
  @IsDateString()
  @IsNotEmpty()
  duration: string;
  @IsString()
  @IsOptional()
  lyrics: string;
}
