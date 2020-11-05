import React, { useContext, useEffect } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  useLocation,
  RouteProps,
} from 'react-router-dom';
import LoginScene from '../../Ui/LoginScene';
import HomeScene from '../../Ui/HomeScene';
import Routes from '../../Resources/Routes/Routes';
import { AuthContext } from '../../Store/AuthContext';

const CustomRoute: React.FC<RouteProps> = props => {
  const currentLocation = useLocation();
  const authenticationPath = Routes.loginScene;
  const {
    authLoading,
    isAuthenticated,
    redirectPathOnAuthentication,
    setRedirectPathOnAuthentication,
  } = useContext(AuthContext);

  useEffect(() => {
    if (
      !isAuthenticated &&
      !authLoading &&
      currentLocation.pathname !== Routes.loginScene
    ) {
      setRedirectPathOnAuthentication(currentLocation.pathname);
    }
  }, [authLoading]);

  if (!authLoading) {
    const redirectPath = !isAuthenticated
      ? authenticationPath
      : redirectPathOnAuthentication;

    if (redirectPath !== currentLocation.pathname) {
      const renderComponent = () => (
        <Redirect to={{ pathname: redirectPath }} />
      );
      return (
        <Route
          {...props}
          component={renderComponent}
          render={undefined}
        />
      );
    }
    return <Route {...props} />;
  }
  return <>SPINNER</>;
};

const RouterComponent = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Switch>
        <CustomRoute
          exact
          path={Routes.loginScene}
          component={LoginScene}
        />
        <CustomRoute
          exact
          path={Routes.homeScene}
          component={HomeScene}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default RouterComponent;
