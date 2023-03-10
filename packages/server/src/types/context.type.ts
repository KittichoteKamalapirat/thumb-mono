import { Request, Response } from 'express';
import { Session } from 'express-session';
import { Redis } from 'ioredis';

export type RequestWithSession = Request & {
  session?: Session & { channelId?: string; userId: string }; // channelId is channel.id (not youtube id)
};

export type MyContext = {
  req: RequestWithSession;
  res: Response;
  redis: Redis;
};
