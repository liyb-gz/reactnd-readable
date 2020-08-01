import React from 'react';
import { Box, createStyles, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) =>
  createStyles({
    logo: { width: '100%', padding: theme.spacing(2) },
  })
);

interface Props {
  className?: string;
}

const Logo = (props: Props) => {
  const classes = useStyles();
  return (
    <Box className={props.className}>
      <img src="/logo.svg" className={classes.logo} alt="Readable logo" />
    </Box>
  );
};

export default Logo;
