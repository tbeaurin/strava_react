import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginScene from '../../Ui/LoginScene';
import Routes from '../../Resources/Routes/Routes';

const RouterComponent = (): JSX.Element => {
  return (
    <Switch>
      {/* LOGIN */}
      <Route
        exact
        path={`${Routes.routeLogin}`}
        component={LoginScene}
      />
    </Switch>
  );
}

export default RouterComponent;
