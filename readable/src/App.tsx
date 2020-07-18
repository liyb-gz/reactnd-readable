import React from 'react';
import {
  makeStyles,
  createStyles,
  Theme,
  CssBaseline,
  Typography,
} from '@material-ui/core';
import { Switch, Route } from 'react-router-dom';

import Topbar from './layouts/Topbar';
import Sidebar from './layouts/Sidebar';
import Main from './layouts/Main';
import SidebarMenu from './features/Menu/SidebarMenu';
import Home from './containers/Home';
import Categories from './containers/Categories';
import Post from './containers/Post';
import AddPost from './containers/AddPost';

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

const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Topbar />
      <Sidebar>
        <SidebarMenu />
      </Sidebar>
      <Main>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/categories" component={Categories} />
          <Route path="/post" component={Post} exact />
          <Route path="/post/new" component={AddPost} />
        </Switch>
        <div>
          <Typography paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
            dolor purus non enim praesent elementum facilisis leo vel. Risus at
            ultrices mi tempus imperdiet. Semper risus in hendrerit gravida
            rutrum quisque non tellus. Convallis convallis tellus id interdum
            velit laoreet id donec ultrices. Odio morbi quis commodo odio aenean
            sed adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
            integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
            eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
            quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
            vivamus at augue. At augue eget arcu dictum varius duis at
            consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
            donec massa sapien faucibus et molestie ac.
          </Typography>
          <Typography paragraph>
            Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
            ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
            elementum integer enim neque volutpat ac tincidunt. Ornare
            suspendisse sed nisi lacus sed viverra tellus. Purus sit amet
            volutpat consequat mauris. Elementum eu facilisis sed odio morbi.
            Euismod lacinia at quis risus sed vulputate odio. Morbi tincidunt
            ornare massa eget egestas purus viverra accumsan in. In hendrerit
            gravida rutrum quisque non tellus orci ac. Pellentesque nec nam
            aliquam sem et tortor. Habitant morbi tristique senectus et.
            Adipiscing elit duis tristique sollicitudin nibh sit. Ornare aenean
            euismod elementum nisi quis eleifend. Commodo viverra maecenas
            accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam
            ultrices sagittis orci a.
          </Typography>
        </div>
      </Main>
    </div>
  );
};

export default App;
