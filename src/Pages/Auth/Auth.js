import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import {ActionType} from "../../redux/actions/actionType"
import Icon from "./icon";
import useStyles from "./Styles";
import Input from "./input";

import SnackBar from "my-react-snackbar";
import { signin, signup } from "../../redux/actions/auth";
const initialState = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

   const googleSuccess = async (res) => {
     const result = res?.profileObj;
     const token  =  res?.tokenId;
         try {
           dispatch({ type: ActionType.auth, data: { result, token } });
           history.push('/');
         } catch (error) {
           console.log(error);
         }
   };

   const googleError = () =>
     alert("Google Sign In was unsuccessful. Try again later");

    const handleSubmit = (e) => {
      e.preventDefault();
       if (isSignup) {
         dispatch(signup(form, history));
         <SnackBar
           open={true}
           message={"Are you sure you want to delete it?"}
           position="top-center"
           type="warning"
           onYes={() => {
             history.push('/')
           }}
         />;
       } else {
          
         dispatch(signin(form, history));
       }
    };
 
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar
          className={classes.avatar}
          style={{ backgroundColor: "#4F46E5" }}
        >
          <PersonAddIcon
            style={{ color: "white", backgroundColor: "#4F46E5" }}
          />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isSignup ? "Sign up" : "Sign in"}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="username"
                  label="username"
                  handleChange={handleChange}
                  autoFocus
                  fullWidth
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Confirm Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          <Typography style={{ textAlign: "center" }}>OR</Typography>

          <GoogleLogin
            clientId="270679592216-88b306rjc9tilaevc2n592hesd2dbnhl.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
          />
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Sign in"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default SignUp;
