// Oauth variables requiredby Strava
const apiOAuth = 'https://www.strava.com/oauth/authorize';
const clientId: number = 55119;
const redirectUri:string = 'http://localhost:3000';
const clientSecret: string = 'e0128850247ee3363c2095d5672ec328d1e73704';
const responseType: string = 'code';
const scope: string = 'activity:read_all';
const grantType: string = 'authorization_code';

export default {
  apiOAuth,
  clientId,
  redirectUri,
  clientSecret,
  responseType,
  scope,
  grantType,
};
