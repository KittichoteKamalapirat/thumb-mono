import { Module } from '@nestjs/common';
import { TestingsService } from './testings.service';
import { TestingsResolver } from './testings.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Testing } from './entities/testing.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Testing])],
  providers: [TestingsResolver, TestingsService],
  exports: [TestingsService],
})
export class TestingsModule {}
