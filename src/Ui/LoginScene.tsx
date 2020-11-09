/* eslint-disable no-unused-expressions */
import React, { useContext, useEffect, useState } from 'react';
import { withStyles, Theme } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import cover from '../Resources/Images/cover.jpg';
import connectLight2x from '../Resources/Images/connect_light@2x.png';
import connectLight from '../Resources/Images/connect_light.png';
import connect2x from '../Resources/Images/connect@2x.png';
import connect from '../Resources/Images/connect.png';
import Constants from '../Resources/Constants/Constants';
import { post } from '../Services/api';
import NetworkUrls from '../Services/NetworkUrls';
import { AuthContext, setTokens } from '../Store/AuthContext';
import Routes from '../Resources/Routes/Routes';

const styles = (theme: Theme) => ({
  background: {
    alignItems: 'center',
    backgroundImage: `url('${cover}')`,
    backgroundSize: 'cover',
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },
  button: {
    padding: 0,
  },
  connectLink: {
    height: 96,
    width: 392,
    [theme.breakpoints.down('sm')]: {
      height: 48,
      width: 196,
    },
  },
  connectImage: {
    position: 'absolute' as const,
    cursor: 'pointer',
    transitionDuration: '250ms',
    transitionProperty: 'opacity',
  },
});

type Props = {
  classes: {
    background: string;
    button: string;
    connectImage: string;
    connectLink: string;
  };
  theme: Theme;
  location: Location;
};

const LoginScene = ({
  classes,
  theme,
  location,
}: Props): JSX.Element => {
  const [isHover, setIsHover] = useState(false);
  const [redirect, setRedirect] = useState('');
  const [code, setCode] = useState('');
  const {
    isAuthenticated,
    setAuthLoading,
    setIsAuthenticated,
    setAthlete,
  } = useContext(AuthContext);

  const postOauth = async (): Promise<void> => {
    const path = `${NetworkUrls.postOauthCode}?client_id=${Constants.clientId}&code=${code}&client_secret=${Constants.clientSecret}`;
    const oauthResponse = await post({ path });
    if (oauthResponse.access_token) {
      setTokens(oauthResponse);
      setIsAuthenticated(true);
      setAthlete(oauthResponse.athlete);
    }
    setAuthLoading(false);
    setRedirect(Routes.homeScene);
  };

  const checkConnection = async (): Promise<void> => {
    const newCode = new URLSearchParams(location.search).get('code');
    if (!isAuthenticated && newCode) {
      setCode(newCode);
    }
  };

  useEffect(() => {
    checkConnection();
  }, []);

  useEffect(() => {
    code && postOauth();
  }, [code]);

  const toggleImage = (): void => {
    setIsHover(!isHover);
  };

  const breakpoints = theme.breakpoints.values;

  return redirect && redirect !== '' ? (
    <Redirect to={{ pathname: redirect }} />
  ) : (
    <div className={classes.background}>
      <a
        className={classes.connectLink}
        href={`${NetworkUrls.getOauthCode}?client_id=${Constants.clientId}&redirect_uri=${Constants.redirectUri}&response_type=${Constants.responseType}&scope=${Constants.scope}`}
        onMouseEnter={toggleImage}
        onMouseLeave={toggleImage}>
        <img
          className={[classes.connectImage, classes.connectLink].join(
            ' '
          )}
          style={{ opacity: isHover ? 0 : 1 }}
          src={connectLight2x}
          srcSet={`${connectLight} ${breakpoints.sm}w , ${connectLight2x} ${breakpoints.lg}w`}
          alt="connect with Strava"
        />
        <img
          className={[classes.connectImage, classes.connectLink].join(
            ' '
          )}
          style={{ opacity: isHover ? 1 : 0 }}
          src={connect2x}
          srcSet={`${connect} ${breakpoints.sm}w , ${connect2x} ${breakpoints.lg}w`}
          alt="connect with Strava"
        />
      </a>
    </div>
  );
};

export default withStyles(styles, {
  withTheme: true,
  withRouter: true,
})(LoginScene);
