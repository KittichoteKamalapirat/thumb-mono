import { Channel } from '../resources/channels/entities/channel.entity';
import { Testing } from '../resources/testings/entities/testing.entity';
import { User } from '../resources/users/entities/user.entity';

export const typeormConfigNest = {
  type: 'postgres' as const,
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'chain123',
  database: 'thumb_dev',
  entities: [User, Channel, Testing],
  synchronize: true,
  logging: true,
};
