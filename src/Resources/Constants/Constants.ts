// Oauth variables requiredby Strava
const apiOAuth = 'https://www.strava.com/oauth';
const api = 'https://www.strava.com/api/v3';
const clientId = 55119;
const redirectUri = 'http://localhost:3000';
const clientSecret = 'e0128850247ee3363c2095d5672ec328d1e73704';
const responseType = 'code';
const scope = 'activity:read_all';
const grantType = 'authorization_code';

export default {
  apiOAuth,
  api,
  clientId,
  redirectUri,
  clientSecret,
  responseType,
  scope,
  grantType,
};
