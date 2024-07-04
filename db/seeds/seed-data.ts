import { Artist } from 'src/artists/artist.entity';
import { User } from 'src/users/user.entity';
import { EntityManager } from 'typeorm';
import { faker } from '@faker-js/faker';
import { v4 as uuid4 } from 'uuid';
import * as bcrypt from 'bcryptjs';
import { Playlist } from '../../src/playlists/playlist.entity';
import { Song } from 'src/songs/song.entity';
import { randomInt } from 'crypto';

export const seedData = async (manager: EntityManager): Promise<void> => {
  //1
  // Add your seeding logic here using the manager
  // For example:

  for (let i = 0; i < 100; i++) {
    await seedUser();
    await seedArtist();
    await seedPlayLists();
    await seedSongs();
  }

  async function seedUser() {
    //2
    const salt = await bcrypt.genSalt();
    const encryptedPassword = await bcrypt.hash('123456', salt);

    const user = new User();
    user.firstName = faker.person.firstName();
    user.lastName = faker.person.lastName();
    user.email = faker.internet.email();
    user.password = encryptedPassword;
    user.apiKey = uuid4();

    await manager.getRepository(User).save(user);
  }

  async function seedArtist() {
    const salt = await bcrypt.genSalt();
    const encryptedPassword = await bcrypt.hash('123456', salt);

    const user = new User();
    user.firstName = faker.person.firstName();
    user.lastName = faker.person.lastName();
    user.email = faker.internet.email();
    user.password = encryptedPassword;
    user.apiKey = uuid4();

    const artist = new Artist();
    artist.user = user;
    await manager.getRepository(User).save(user);
    await manager.getRepository(Artist).save(artist);
  }

  async function seedSongs() {
    const song = new Song();
    song.title = faker.music.songName();
    song.releasedDate = faker.date.between({
      from: '2020-01-01',
      to: '2024-01-01',
    });
    song.lyrics = faker.lorem.paragraph({ min: 2, max: 11 });
    const date = faker.date.past(); // Generate a random past date
    const minutes = date.getMinutes().toString().padStart(2, '0'); // Get minutes and pad with leading zero if necessary
    const seconds = date.getSeconds().toString().padStart(2, '0');
    song.duration = `00:${minutes}:${seconds}`;
    song.playList = await manager.getRepository(Playlist).findOneBy({
      id: randomInt(await manager.getRepository(Playlist).count()),
    });
    song.artists = await manager
      .getRepository(Artist)
      .findBy({ id: randomInt(await manager.getRepository(Artist).count()) });

    await manager.getRepository(Song).save(song);
  }

  async function seedPlayLists() {
    const salt = await bcrypt.genSalt();
    const encryptedPassword = await bcrypt.hash('123456', salt);

    const user = new User();
    user.firstName = faker.person.firstName();
    user.lastName = faker.person.lastName();
    user.email = faker.internet.email();
    user.password = encryptedPassword;
    user.apiKey = uuid4();

    const playList = new Playlist();
    playList.name = faker.music.genre();
    playList.user = user;

    await manager.getRepository(User).save(user);
    await manager.getRepository(Playlist).save(playList);
  }
};
