/* eslint-disable camelcase */

export type activityData = {
  name: string;
  start_date: string;
  type: 'Run' | 'Ride' | 'Swim' | 'Other';
};

export type activitiesData = activityData[];
