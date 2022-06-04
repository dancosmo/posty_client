import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import decode from "jwt-decode";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AppBar, Typography, Toolbar, Avatar, Button } from "@mui/material";
import { pink } from '@mui/material/colors';

//-----------<ComponentStyles>--------------

const pinkColor= pink[500];

const StyledAppBar = styled(AppBar)`
  border-radius: 15px;
  margin: 30px 0;
  display: flex;
  flex-direction: row !important;
  justify-content: space-between;
  align-items: center;
`;

const StyledTypography = styled(Typography)`
margin-left: 16px !important;
text-decoration: none;
color: ${pinkColor};
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
    background-color: ${pinkColor} !important;
`
//-----------</ComponentStyles>--------------


const Navbar = () => {
  const localUser = JSON.parse(localStorage.getItem("profile"));
  const [user, setUser] = useState(localUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () =>{
    dispatch({ type: "LOGOUT" });
    setUser(null);
    navigate("/auth");

  };

   useEffect(() =>{
      const token = user?.token;

      if(token){
        const decodedToken = decode(token);

        if(decodedToken.exp * 1000 < new Date().getTime()) return logout();
      }

      setUser(JSON.parse(localStorage.getItem("profile")));
   },[location, user?.token]);

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
                    <UserName variant="h6">{user.result.name}</UserName>
                    <StyledButton variant="contained" onClick={logout}>Logout</StyledButton>
                </Profile>
            ) : (
                <StyledButton component={Link} to="/auth" variant="contained">Sign In</StyledButton>
            )}
        </StyledToolbar>
    </StyledAppBar>
  );
};

export default Navbar;
