import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import { useTheme } from "@material-ui/core/styles";
import Feed from "./components/Posts/posts";
import useStyles from "./Styles";
import { getPosts } from "./redux/actions/post";
import { useDispatch } from "react-redux";
import CustomAppBar from "./components/AppBar";
import Sidebar from "./components/drawer";
import Create from "./components/Forms/form";
import Auth from "./Pages/Auth/Auth";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function ResponsiveDrawer(props) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const { window } = props;
  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
    
  const container =
    window !== undefined ? () => window().document.body : undefined;
    useEffect(() => {
      
      dispatch(getPosts());
    }, [dispatch]);
  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <CustomAppBar
          handleDrawerToggle={handleDrawerToggle}
          setuser={setUser}
          user={user}
        />
        <nav className={classes.drawer} aria-label="mailbox folders">
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true,
              }}
            >
             <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              <Sidebar  />
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route path="/create" exact component={Create} />
            <Route path="/" exact component={Feed} />
            <Route path="/auth" exact component={Auth} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default ResponsiveDrawer;
