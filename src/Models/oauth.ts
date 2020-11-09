/* eslint-disable camelcase */
import { AthleteData } from './athlete';

export type OauthData = {
  token_type: string;
  expires_at: string;
  expires_in: string;
  refresh_token: string;
  access_token: string;
  athlete: AthleteData;
};
