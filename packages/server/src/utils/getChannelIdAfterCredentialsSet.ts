import { oauth2Client } from '../oauthClient';
import { google } from 'googleapis';

export const getChannelIdAfterCredentialsSet = async () => {
  console.log('get channel id 1');
  const youtube = google.youtube({
    version: 'v3',
    auth: oauth2Client,
  });

  console.log('get channel id 2');
  const result = await youtube.channels.list({
    part: ['snippet'],
    mine: true,
  });
  console.log('get channel id 3');

  const channelId = result.data.items?.[0].id;

  console.log('get channel id 4');
  return channelId;
};
