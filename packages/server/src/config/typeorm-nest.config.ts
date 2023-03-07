import { IS_PROD } from '../constants';
import { Channel } from '../resources/channels/entities/channel.entity';
import { Customer } from '../resources/customers/entities/customer.entity';
import { Product } from '../resources/products/entities/product.entity';
import { Subscription } from '../resources/subscriptions/entities/subscription.entity';
import { Testing } from '../resources/testings/entities/testing.entity';
import { User } from '../resources/users/entities/user.entity';

export const typeormConfigNest = {
  type: 'postgres' as const,
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT),
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  entities: [User, Channel, Testing, Subscription, Customer, Product],
  // synchronize: !IS_PROD, // sync if not prod
  synchronize: true,
  logging: !IS_PROD, // log if not prod
};
