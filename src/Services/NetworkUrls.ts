import Constants from '../Resources/Constants/Constants';

// Api routes
const getOauthCode = `${Constants.apiOAuth}/authorize`;
const postOauthCode = `${Constants.apiOAuth}/token`;
const getActivities = `${Constants.apiOAuth}/athlete/activities`;
const getAthlete = `${Constants.api}/athlete`;

export default {
  getOauthCode,
  postOauthCode,
  getActivities,
  getAthlete,
};
