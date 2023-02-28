/* eslint-disable max-len */
// import * as fs from "fs";
import { google } from 'googleapis';

// const secretFileName = "client_secret.json";
// const SECRET_PATH = `${__dirname}/../${secretFileName}`;

export const getOAuth2Client = () => {
  // const content = fs.readFileSync(SECRET_PATH, "utf8");
  // const credentials = JSON.parse(String(content));
  // const clientSecret = credentials.web.client_secret;
  // const clientId = credentials.web.client_id;
  // const redirectUrl = credentials.web.redirect_uris[0];
  const clientSecret = process.env.GOOGLE_AUTH_CLIENT_SECRET;
  const clientId = process.env.GOOGLE_AUTH_CLIENT_ID;
  const redirectUrl = process.env.GOOGLE_AUTH_REDIRECT_URL;

  return new google.auth.OAuth2(clientId, clientSecret, redirectUrl);
};
