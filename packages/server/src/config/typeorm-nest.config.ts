import { Channel } from '../resources/channels/entities/channel.entity';
import { Testing } from '../resources/testings/entities/testing.entity';
import { UserChannel } from '../resources/user-channels/entities/user-channel.entity';
import { User } from '../resources/users/entities/user.entity';

export const typeormConfigNest = {
  type: 'postgres' as const,
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'chain123',
  database: 'thumb_dev',
  entities: [User, Channel, UserChannel, Testing],
  synchronize: true,
  logging: true,
};
