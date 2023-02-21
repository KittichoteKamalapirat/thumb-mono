import { getOAuth2Client } from './utils/getOAuth2Client';
import { google } from 'googleapis';

export const oauth2Client = getOAuth2Client();

export const youtube = google.youtube({
  version: 'v3',
  auth: oauth2Client,
});

export const analytics = google.youtubeAnalytics({
  version: 'v2',
  auth: oauth2Client,
});
