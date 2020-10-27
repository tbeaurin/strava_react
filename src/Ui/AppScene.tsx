import React, { Component } from 'react';
import { withStyles, Theme } from '@material-ui/core/styles';
import cover from '../Resources/Images/cover.jpg';
import connectLight2x from '../Resources/Images/connect_light@2x.png';
import connectLight from '../Resources/Images/connect_light.png';
import connect2x from '../Resources/Images/connect@2x.png';
import connect from '../Resources/Images/connect.png';
import Constants from '../Resources/Constants/Constants';

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
    position: 'absolute' as 'absolute',
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
  theme: Theme
}

type State = {
  isHover: boolean;
}

class AppScene extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isHover: false,
    };
  }

  toggleImage = () => {
    const { isHover } = this.state;
    this.setState({ isHover: !isHover });
  }

  render() {
    const { classes, theme } = this.props;
    const breakpoints = theme.breakpoints.values;
    const { isHover } = this.state;

    return (
      <div className={classes.background}>
        <a
          className={classes.connectLink}
          href={`${Constants.apiOAuth}?client_id=${Constants.clientId}&redirect_uri=${Constants.redirectUri}&response_type=${Constants.responseType}&scope=${Constants.scope}`}
          onMouseEnter={this.toggleImage}
          onMouseLeave={this.toggleImage}
        >
          <img
            className={[classes.connectImage, classes.connectLink].join(' ')}
            style={{ opacity: isHover ? 0 : 1 }}
            src={connectLight2x}
            srcSet={`${connectLight} ${breakpoints.sm}w , ${connectLight2x} ${breakpoints.lg}w`}
            alt="connect with Strava"
          />
          <img
            className={[classes.connectImage, classes.connectLink].join(' ')}
            style={{ opacity: isHover ? 1 : 0 }}
            src={connect2x}
            srcSet={`${connect} ${breakpoints.sm}w , ${connect2x} ${breakpoints.lg}w`}
            alt="connect with Strava"
          />
        </a>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(AppScene);
