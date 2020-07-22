import React from 'react';
import {
  Typography,
  Grid,
  ListItem,
  ListItemText,
  List,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core';
import { PostProps } from '../types/post';
import PostListItem from '../features/PostListItem';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    description: {
      color: theme.palette.text.primary,
      marginTop: theme.spacing(1),
    },
    title: {
      display: 'inline-block',
      marginRight: theme.spacing(2),
    },
    time: {
      color: theme.palette.text.secondary,
    },
  })
);

const testPost: PostProps = {
  title: 'Test Post',
  description:
    'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse ducimus incidunt illum exercitationem asperiores? Ullam, assumenda deserunt minus, omnis consequatur sunt nihil magnam quos in non nesciunt porro, aut rem?',
  id: '4e932e34',
  timestamp: 1595331503845,
};

const Categories = (props: PostProps) => {
  const classes = useStyles();
  return (
    <div>
      <Typography variant="h2">Categories</Typography>
      <Grid container>
        <Grid item xs={12}>
          {/* <List> */}
          <PostListItem {...testPost} />
          <ListItem disableGutters>
            <ListItemText
              classes={{ secondary: classes.description }}
              secondary="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut earum velit voluptate. Iusto, necessitatibus quis rerum, sint fugiat accusantium placeat magnam doloribus recusandae sunt maiores asperiores reprehenderit in excepturi quo?"
            >
              <Typography
                variant="h4"
                component="span"
                className={classes.title}
              >
                Post title
              </Typography>
              <Typography
                variant="body2"
                component="span"
                className={classes.time}
              >
                Jul 8 at 20:12
              </Typography>
            </ListItemText>
          </ListItem>
          <ListItem disableGutters>
            <ListItemText secondary="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut earum velit voluptate. Iusto, necessitatibus quis rerum, sint fugiat accusantium placeat magnam doloribus recusandae sunt maiores asperiores reprehenderit in excepturi quo?">
              <Typography variant="h4" component="span">
                Post title
              </Typography>
              <Typography variant="body2" component="span">
                Jul 8 at 20:12
              </Typography>
            </ListItemText>
          </ListItem>
          <ListItem disableGutters>
            <ListItemText secondary="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut earum velit voluptate. Iusto, necessitatibus quis rerum, sint fugiat accusantium placeat magnam doloribus recusandae sunt maiores asperiores reprehenderit in excepturi quo?">
              <Typography variant="h4" component="span">
                Post title
              </Typography>
              <Typography variant="body2" component="span">
                Jul 8 at 20:12
              </Typography>
            </ListItemText>
          </ListItem>
          {/* </List> */}
        </Grid>
      </Grid>
    </div>
  );
};

export default Categories;
