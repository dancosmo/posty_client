import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, CircularProgress } from "@mui/material";
import Post from './Post/Post';

import styled from "styled-components";
//-----------<ComponentStyles>----------------
const StyledGrid = styled(Grid)`
    display: flex;
`;
//-----------</ComponentStyles>---------------

const Posts = ({ setCurrentId }) =>{

    const posts = useSelector((state) => state.posts);


    return (   
            !posts.length ? <CircularProgress /> : (
                <StyledGrid container alignItems="stretch" spacing={4}>
                    {posts.map(post =>(
                        <Grid key={post._id} item xs={12} sm={6}>
                            <Post post={post} setCurrentId={setCurrentId}/>
                        </Grid>
                    ))}
                </StyledGrid>
            )
    );
}

export default Posts;