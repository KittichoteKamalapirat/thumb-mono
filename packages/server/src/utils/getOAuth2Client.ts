import dotenv from 'dotenv-safe';
// import * as fs from "fs";
import { google } from 'googleapis';

// IMPORTANT: cannot rely on nestjs because this file is used before the app even bootstrap
if (process.env.NODE_ENV) {
  switch (process.env.NODE_ENV) {
    case 'development':
      dotenv.config({
        path: `${__dirname}/../../.env.development`,
        allowEmptyValues: true,
      });
      break;
    default:
      break; // do nothing
  }
} else {
  dotenv.config({
    path: `${__dirname}/../../.env.development`,
    allowEmptyValues: true,
  });
}

export const getOAuth2Client = () => {
  console.log(
    'process.env.GOOGLE_AUTH_CLIENT_SECRET',
    process.env.GOOGLE_AUTH_CLIENT_SECRET,
  );
  console.log(
    'process.env.GOOGLE_AUTH_CLIENT_ID',
    process.env.GOOGLE_AUTH_CLIENT_ID,
  );
  console.log(
    'process.env.GOOGLE_AUTH_REDIRECT_URL',
    process.env.GOOGLE_AUTH_REDIRECT_URL,
  );
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
