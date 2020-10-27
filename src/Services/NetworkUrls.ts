import Constants from '../Resources/Constants/Constants';

// Api routes
const getOauthCode = `${Constants.apiOAuth}/authorize`;
const postOauthCode = `${Constants.apiOAuth}/token`;

export default {
    getOauthCode,
    postOauthCode
};
