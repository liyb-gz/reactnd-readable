import React from 'react';
import {
  Box,
  Chip,
  makeStyles,
  Theme,
  createStyles,
  Grid,
  CardHeader,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Switch,
  IconButton,
} from '@material-ui/core';

import * as Icon from 'react-feather';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    chips: {
      display: 'flex',
      justifyContent: 'flex-start',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    controlBar: {
      display: 'flex',
      justifyItems: 'space-between',
    },
  })
);

interface Props {}

const Home = (props: Props) => {
  const classes = useStyles();
  return (
    <div>
      <h1>Home</h1>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid item>
          <Box className={classes.chips}>
            <Chip label="Category Name" clickable />
            <Chip label="Category Name" clickable color="primary" />
            <Chip label="Category Name" clickable />
          </Box>
        </Grid>
        <Grid item>
          <IconButton>
            <Icon.Grid size={20} />
          </IconButton>
          <IconButton>
            <Icon.List size={20} />
          </IconButton>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardHeader title="Post Title" subheader="14 July at 09:57 " />
            <CardContent>
              <Typography component="p">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam
                sed tenetur iure dignissimos deserunt placeat ipsa dolore quo.
                Maxime nam iste sunt libero possimus blanditiis in. Non
                voluptates culpa placeat.
              </Typography>
            </CardContent>
            <CardActions>
              <Button color="primary">Action</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
