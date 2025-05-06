import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'postgres',
  port: 5432,
  username: 'admin',
  password: 'qwer1234!',
  database: 'guestbook',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
