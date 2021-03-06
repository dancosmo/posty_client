import { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import decode from "jwt-decode";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AppBar, Typography, Toolbar, Avatar, Button } from "@mui/material";

//-----------<ComponentStyles>--------------

const StyledAppBar = styled(AppBar)`
  border-radius: 15px;
  margin: 30px 0;
  display: flex;
  flex-direction: row !important;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(to right,#7f0e7f 10.85%,#7f0e7f 23.28%,#7f0e7f 50%);
`;

const StyledTypography = styled(Typography)`
margin-left: 16px !important;
text-decoration: none;
color: white;
`;
const UserName = styled(Typography)`
  display: flex;
  align-items: center;
`;
const BrandContainer = styled.div`
display: flex;
align-items: center;
`;
const StyledToolbar = styled(Toolbar)`
display: flex;
justify-content: flex-end;
width: 400px;
`;
const Profile = styled.div`
display: flex;
justify-content: space-between;
width: 400px;
`;
const StyledButton = styled(Button)`
    
`
//-----------</ComponentStyles>--------------


const Navbar = () => {
  const localUser = JSON.parse(localStorage.getItem("profile"));
  const [user, setUser] = useState(localUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const logout = useCallback(() =>{
    dispatch({ type: "LOGOUT" });
    setUser(null);
    navigate("/auth");
  },[dispatch, navigate]);

   useEffect(() =>{
      const token = user?.token;

      if(token){
        const decodedToken = decode(token);

        if(decodedToken.exp * 1000 < new Date().getTime()) return logout();
      }

      setUser(JSON.parse(localStorage.getItem("profile")));
   },[location, user?.token, logout]);

  return (
    <StyledAppBar position="static" color="inherit">
        <BrandContainer>
      <StyledTypography component={Link} to="/" variant="h3" align="center">
        Posty
      </StyledTypography>
      </BrandContainer>
        <StyledToolbar>
            {user ? (
                <Profile>
                    <Avatar alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                    <UserName variant="h6" color="white">{user.result.name}</UserName>
                    <StyledButton variant="contained" color="secondary" onClick={logout}>Logout</StyledButton>
                </Profile>
            ) : (
                <StyledButton component={Link} to="/auth" variant="contained" color="secondary">Sign In</StyledButton>
            )}
        </StyledToolbar>
    </StyledAppBar>
  );
};

export default Navbar;
