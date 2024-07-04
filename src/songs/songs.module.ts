import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { connection } from 'src/common/constants/connection';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from './song.entity';
import { Artist } from 'src/artists/artist.entity';

// const mockSongsService = {
//   findAll() {
//     return [{ id: 1, title: 'Testing', artists: ['asv'] }];
//   },
// };

@Module({
  imports: [TypeOrmModule.forFeature([Song, Artist])],
  controllers: [SongsController],
  // providers: [SongsService], // standard provider

  // providers: [
  //   {
  //     provide: SongsService,
  //     useClass: SongsService,
  //   },
  // ], // Class provider option with useClass (use as a class when injected into another class)

  // providers: [
  //   {
  //     provide: SongsService,
  //     useValue: mockSongsService,
  //   },
  // ], // Value providers with useValue for replacing the real service response with the mock response or for injecting external libs into Nest providers

  providers: [SongsService, { provide: 'CONNECTION', useValue: connection }], // Non-class based providers for injecting objects as a provider
})
export class SongsModule {}
