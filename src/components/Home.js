import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { getPosts } from "../actions/posts";

import Posts from "./Posts/Posts";
import Form from "./Form/Form";

import { Grow, Container, Grid } from "@mui/material";
import styled from "styled-components";


//-----------<ComponentStyles>--------------

const StyledGrid = styled(Grid)`
@media only screen and (max-width: 768px) {
    flex-direction: column-reverse !important;
}
`;
//-----------</ComponentStyles>---------------

const Home = () => {
const [currentId, setCurrentId ] = useState(null);
const dispatch = useDispatch()

useEffect(() =>{
    dispatch(getPosts());
},[dispatch])

    return (
        <Grow in>
        <Container>
          <StyledGrid
            container
            justify="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} sm={8}>
              <Posts setCurrentId={setCurrentId}/>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId}/>
            </Grid>
          </StyledGrid>
        </Container>
      </Grow>
    );
}

export default Home;