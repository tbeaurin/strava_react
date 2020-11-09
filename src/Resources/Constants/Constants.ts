// Oauth variables requiredby Strava
const apiOAuth = 'https://www.strava.com/oauth';
const api = 'https://www.strava.com/api/v3';
const clientId = 55119;
const redirectUri = 'http://localhost:3000';
const clientSecret = 'e0128850247ee3363c2095d5672ec328d1e73704';
const responseType = 'code';
const scope = 'activity:read_all';
const grantType = 'authorization_code';

const typeColor = {
  Run: '#003f00', // dark green
  Ride: '#e65100', // dark orange (theme color)
  Swim: '#000081', // dark blue
  Other: '#4d1265', // dark purple
};

const monthNames = [
  'Janvier',
  'Février',
  'Mars',
  'Avril',
  'Mai',
  'Juin',
  'Juillet',
  'Août',
  'Septembre',
  'Octobre',
  'Novembre',
  'Décembre',
];

export default {
  apiOAuth,
  api,
  clientId,
  redirectUri,
  clientSecret,
  responseType,
  scope,
  grantType,
  typeColor,
  monthNames,
};
