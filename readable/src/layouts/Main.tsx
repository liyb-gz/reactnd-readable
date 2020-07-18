import React, { ReactNode } from 'react';
import { makeStyles, Theme, createStyles, Toolbar } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  })
);

interface Props {
  children: ReactNode;
}

const Main = ({ children }: Props) => {
  const classes = useStyles();
  return (
    <main className={classes.content}>
      <Toolbar />
      {children}
    </main>
  );
};

export default Main;
