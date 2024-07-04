import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { SongsController } from './songs/songs.controller';
import { PlayListModule } from './playlists/playlists.module';
// import { DataSource } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ArtistsModule } from './artists/artists.module';
import { typeOrmAsyncConfig } from 'db/data-source';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { validate } from 'env.validation';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`${process.cwd()}/.env.${process.env.NODE_ENV}`],
      isGlobal: true,
      load: [configuration],
      validate: validate,
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    SongsModule,
    PlayListModule,
    AuthModule,
    UsersModule,
    ArtistsModule,
    SeedModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: DevConfigService,
    //   useClass: DevConfigService,
    // },
    // {
    //   provide: 'CONFIG',
    //   // Used for dynamic providers
    //   useFactory: () => {
    //     return process.env.NODE_ENV === 'development' ? devConfig : proConfig;
    //   },
    // },
  ],
})
// export class AppModule implements NestModule {
//   constructor(private dataSource: DataSource) {
//     console.log('dbname: ', dataSource.driver.database);
//   }
//   configure(consumer: MiddlewareConsumer) {
//     // consumer.apply(LoggerMiddleware).forRoutes('songs'); // option 1

//     // consumer
//     //   .apply(LoggerMiddleware)
//     //   .forRoutes({ path: 'songs', method: RequestMethod.POST }); // option 2

//     consumer.apply(LoggerMiddleware).forRoutes(SongsController); // option 3
//   }
// }
export class AppModule {
  constructor() {}
}
