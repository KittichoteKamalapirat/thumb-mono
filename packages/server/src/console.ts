import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const application = await NestFactory.createApplicationContext(AppModule);

  const command = process.argv[2];

  switch (command) {
    // case 'get-email':
    //   const usersService = application.get(UsersService);
    //   const email = await usersService.getEmailFromGoogle();
    //   console.log('email', email);
    //   break;

    default:
      console.log('Command not found');
      process.exit(1);
  }

  await application.close();
  process.exit(0);
}

bootstrap();
