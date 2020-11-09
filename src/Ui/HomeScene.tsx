import React, { useContext } from 'react';
import { withStyles, Theme } from '@material-ui/core/styles';
import { AuthContext } from '../Store/AuthContext';
import CalendarComponent from '../Components/Components/CalendarComponent';

const styles = (theme: Theme) => ({
  container: {
    padding: '8px 64px',
    backgroundColor: theme.palette.background.default,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
});

type Props = {
  classes: {
    container: string;
  };
};

const HomeScene = ({ classes }: Props): JSX.Element => {
  const { athlete } = useContext(AuthContext);
  return (
    <div className={classes.container}>
      {athlete && <CalendarComponent />}
    </div>
  );
};
export default withStyles(styles)(HomeScene);
