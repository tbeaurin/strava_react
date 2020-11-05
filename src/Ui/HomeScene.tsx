import React, { useContext } from 'react';
import { AuthContext } from '../Store/AuthContext';

const HomeScene = (): JSX.Element => {
  const { athlete } = useContext(AuthContext);
  return <>{athlete?.lastname}</>;
};
export default HomeScene;
