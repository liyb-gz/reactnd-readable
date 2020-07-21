import React from 'react';
import {
  Typography,
  Grid,
  ListItem,
  ListItemText,
  List,
} from '@material-ui/core';

interface Props {}

const Categories = (props: Props) => {
  return (
    <div>
      <Typography variant="h2">Categories</Typography>
      <Grid container>
        <Grid item xs={12}>
          <List>
            <ListItem>
              <ListItemText secondary="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut earum velit voluptate. Iusto, necessitatibus quis rerum, sint fugiat accusantium placeat magnam doloribus recusandae sunt maiores asperiores reprehenderit in excepturi quo?">
                <Typography variant="h4" component="span">
                  Post title
                </Typography>
                <Typography variant="body2" component="span">
                  Jul 8 at 20:12
                </Typography>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText secondary="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut earum velit voluptate. Iusto, necessitatibus quis rerum, sint fugiat accusantium placeat magnam doloribus recusandae sunt maiores asperiores reprehenderit in excepturi quo?">
                <Typography variant="h4" component="span">
                  Post title
                </Typography>
                <Typography variant="body2" component="span">
                  Jul 8 at 20:12
                </Typography>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText secondary="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut earum velit voluptate. Iusto, necessitatibus quis rerum, sint fugiat accusantium placeat magnam doloribus recusandae sunt maiores asperiores reprehenderit in excepturi quo?">
                <Typography variant="h4" component="span">
                  Post title
                </Typography>
                <Typography variant="body2" component="span">
                  Jul 8 at 20:12
                </Typography>
              </ListItemText>
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </div>
  );
};

export default Categories;
