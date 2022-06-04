import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signup, signin } from "../../actions/auth";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@mui/material";


import GoogleLogin from "react-google-login";
import GoogleIcon from "@mui/icons-material/Google";

import Input from "./Input";
import styled from "styled-components";

import LockIcon from "@mui/icons-material/Lock";
import { pink } from "@mui/material/colors";


const clientId = process.env.REACT_APP_CLIENT_ID; 
//-----------<ComponentStyles>--------------

const pinkColor = pink[500];

const StyledPaper = styled(Paper)`
  margin-top: 64px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
`;

const StyledAvatar = styled(Avatar)`
  margin: 8px;
  background-color: ${pinkColor} !important;
`;

const Form = styled.form`
  width: 100%;
  margin-top: 24px;
`;

const StyledButtonTwo = styled(Button)`
  margin-bottom: 16px !important;
  background-color: ${pinkColor} !important;
  color: white !important;
`;

const StyledButton = styled(Button)`
  margin: 24px 0 16px !important;
  background-color: ${pinkColor} !important;
`;

//-----------</ComponentStyles>---------------

const registrationFormInitialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: ''}

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(registrationFormInitialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
   
    if(isSignup){
      dispatch(signup(formData, navigate));
    }
    else{
      dispatch(signin(formData, navigate));
    }
    
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    try {
      dispatch({ type: "AUTH", data: { result, token }});
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = (error) => {
    console.log(error);
    console.log("Google Sign In was unsuccessful.");
  };

  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

  const switchMode = () => setIsSignup((prevIsSignup) => !prevIsSignup);

  return (
    <Container component="main" maxWidth="xs">
      <StyledPaper elevation={3}>
        <StyledAvatar>
          <LockIcon />
        </StyledAvatar>
        <Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Grid container spacing={2}>
            {isSignup ? (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
              </>
            ) : null}
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
            {isSignup ? (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              ></Input>
            ) : null}
          </Grid>

          <Grid container>
            <Grid item>
              <StyledButton type="submit" fullWidth variant="contained" onClick={handleSubmit}>
                {isSignup ? "Sign Up" : "Sign In"}
              </StyledButton>
              <StyledButtonTwo fullWidth variant="contained" onClick={switchMode}>
                {isSignup
                  ? "Already have an account ? Sign In"
                  : "Don't have an account ? Sign Up"}
              </StyledButtonTwo>
              <GoogleLogin
                clientId={clientId}
                render={(renderProps) => (
                  <StyledButtonTwo
                    fullWidth
                    onClick={renderProps.onClick}
                    startIcon={<GoogleIcon />}
                    variant="contained"
                  >
                    Google Sign In
                  </StyledButtonTwo>
                )}
                onSuccess={googleSuccess}
                onFailure={googleFailure}
                cookiePolicy={"single_host_origin"}
              />
            </Grid>
          </Grid>
        </Form>
      </StyledPaper>
    </Container>
  );
};

export default Auth;
