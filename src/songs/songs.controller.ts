import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Request,
  Scope,
  UseGuards,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './dto/create-song-dto';
import { Connection } from 'src/common/constants/connection';
import { Song } from './song.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UpdateSongDto } from './dto/update-song-dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { JwtArtistGuard } from 'src/auth/jwt-artist-guard';
import { ApiTags } from '@nestjs/swagger';

@Controller({ path: 'songs', scope: Scope.DEFAULT })
@ApiTags('songs')
export class SongsController {
  constructor(
    private songService: SongsService,
    @Inject('CONNECTION')
    private connection: Connection, // Inject the object as a provider to use it as a dependency
  ) {
    console.log(
      'THis is the connection string ',
      this.connection.CONNECTION_STRING,
    );
  } // injected the SongsService into the controller as a class
  @Post()
  @UseGuards(JwtArtistGuard)
  create(
    @Body() createSongDTO: CreateSongDTO,
    @Request()
    request,
  ): Promise<Song> {
    console.log('request.user: ', request.user);
    return this.songService.create(createSongDTO);
  }

  // @Get()
  // findAll(): Promise<Song[]> {
  //   try {
  //     return this.songService.findAll();
  //   } catch (e) {
  //     throw new HttpException(
  //       'Server Error',
  //       HttpStatus.INTERNAL_SERVER_ERROR,
  //       {
  //         cause: e,
  //       },
  //     );
  //   }
  // }

  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe)
    page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe)
    limit: number = 10,
  ): Promise<Pagination<Song>> {
    limit = limit > 100 ? 100 : limit;
    return this.songService.paginate({
      page,
      limit,
    });
  }

  @Get(':id')
  findOne(
    // @Param('id', ParseIntPipe) // option 1
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    ) // option 2
    id: number,
  ): Promise<Song> {
    return this.songService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSongDto: UpdateSongDto,
  ): Promise<UpdateResult> {
    return this.songService.update(id, updateSongDto);
  }

  @Delete(':id')
  delete(
    @Param('id', new ParseIntPipe())
    id: number,
  ): Promise<DeleteResult> {
    return this.songService.remove(id);
  }
}
