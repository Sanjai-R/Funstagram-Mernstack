import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Button } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { Link, useHistory, useLocation } from "react-router-dom";
import useStyles from "../Styles";
import { useDispatch } from "react-redux";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { ActionType } from "../redux/actions/actionType";
import decode from "jwt-decode";
function CustomAppBar({ handleDrawerToggle,setuser,User }) {
  
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const logout = () => {
    dispatch({ type: ActionType.logout });
    history.push("/");
    setUser(null);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
  }, [location]);
  return (
    <AppBar
      position="fixed"
      className={classes.appBar}
      style={{ backgroundColor: "white" }}
    >
      <Toolbar style={{ justifyContent: "space-between" }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          className={classes.menuButton}
        >
          <ChevronRightIcon style={{ color: "black" }} />
        </IconButton>
        <Link to="/">
          <img
            src="/funstgram.png"
            alt="disney-font"
            border="0"
            height="30"
            width="150"
          />
        </Link>
        {user?.result ? (
          <div className={classes.profile}>
            <div ></div>
            <Button
              variant="contained"
              className={classes.logout}
              style={{
                color: "#4F46E5",
              }}
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
            style={{
              backgroundColor: "#4F46E5",
            }}
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}


export default CustomAppBar;
