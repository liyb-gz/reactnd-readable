import React from 'react';
import { Box, createStyles, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) =>
  createStyles({
    logo: { width: '100%', padding: theme.spacing(2) },
  })
);

const Logo = () => {
  const classes = useStyles();
  return (
    <Box>
      <img src="/logo.svg" className={classes.logo} alt="Readable logo" />
    </Box>
  );
};

export default Logo;
