import React from 'react';
import {
  Box,
  Chip,
  makeStyles,
  Theme,
  createStyles,
  Grid,
  IconButton,
  Typography,
} from '@material-ui/core';

import * as Icon from 'react-feather';
import PostCard from '../features/PostCard/PostCard';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    chips: {
      display: 'flex',
      justifyContent: 'flex-start',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(1),
      },
      '& > *:first-child': {
        marginLeft: 0,
      },
    },
    cards: {
      marginTop: theme.spacing(4),
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
      <Typography variant="h2">Home</Typography>
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
      <Grid container spacing={3} className={classes.cards}>
        <Grid item xs={12} sm={6} lg={4}>
          <PostCard
            title="Post Title"
            timestamp={1595331703845}
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam sed tenetur iure dignissimos deserunt placeat ipsa dolore quo. Maxime nam iste sunt libero possimus blanditiis in. Non voluptates culpa placeat."
            id="1"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <PostCard
            title="Post Title"
            timestamp={1595331703845}
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam sed tenetur iure dignissimos deserunt placeat ipsa dolore quo. Maxime nam iste sunt libero possimus blanditiis in. Non voluptates culpa placeat."
            id="1"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <PostCard
            title="Post Title"
            timestamp={1595331703845}
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam sed tenetur iure dignissimos deserunt placeat ipsa dolore quo. Maxime nam iste sunt libero possimus blanditiis in. Non voluptates culpa placeat."
            id="1"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <PostCard
            title="Post Title"
            timestamp={1595331703845}
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam sed tenetur iure dignissimos deserunt placeat ipsa dolore quo. Maxime nam iste sunt libero possimus blanditiis in. Non voluptates culpa placeat."
            id="1"
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
