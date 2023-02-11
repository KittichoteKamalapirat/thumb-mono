const typeormConfigMigrations = {
  type: 'postgres' as const,
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'chain123',
  database: 'thumb_dev',
  autoLoadEntities: true,
  entities: ['src/**/*.entity.ts'],
  seeds: ['src/db/seeds/**/*.ts'],
  factories: ['src/db/factories/**/*.ts'],
  synchronize: true,
  logging: true,
};

export default typeormConfigMigrations;
