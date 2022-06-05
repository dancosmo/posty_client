import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { TextField, Button, Typography, Paper } from "@mui/material";
import FileBase from "react-file-base64";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";


//-----------<ComponentStyles>----------------


const StyledPaper = styled(Paper)`
    padding: 8px;
    max-width: 348px;
`;
const StyledForm = styled.form`
    margin: 16px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center; 
`;
const StyledFileInput = styled.div`
    width: 97%;
    margin: 10px 0;
`;
const StyledButton = styled(Button)`
    margin: 10px !important;
    
`

//-----------</ComponentStyles>---------------

const Form = ({ currentId, setCurrentId}) =>{
    const dispatch = useDispatch();
    const [postData, setPostData ] = useState({
        title:'', message:'', tags:'', selectedFile:'',  
    });

    const user = JSON.parse(localStorage.getItem('profile'));

    const post = useSelector((state) => currentId ? state.posts.find((post)=> post._id === currentId) : null);

    useEffect(() =>{
        if(post) setPostData(post);
    },[post])

    const handleSubmit = (e) =>{
        e.preventDefault();

        for(const [key, value] of Object.entries(postData)){
            if(typeof key === "string" && value !== ''){
                continue
            }
            if(value === ''){
                return alert("All fields are required")
            }
        }

        if(currentId){
            dispatch(updatePost(currentId, {...postData, name: user?.result?.name}));
        }
        else{
            dispatch(createPost({...postData, name: user?.result?.name}));
        }
        clear();
    }
    
    const clear = () =>{
        setCurrentId(null);
        setPostData({title: '', message:'', tags:'', selectedFile:'',});
    }

    if(!user?.result?.name) {
        return (
            <StyledPaper>
                <Typography variant="h6" align="center">
                    Sign In to create and like Posts.
                </Typography>
            </StyledPaper>
        )
    };

    return (   
        <StyledPaper>
            <StyledForm autoComplete='off' noValidate onSubmit={handleSubmit}>
                <Typography variant='h6'>{ currentId ? 'Editing' : 'Creating'} a Post</Typography>
                <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title}
                onChange={(e) => setPostData({ ...postData, title: e.target.value })}/>
                <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message}
                onChange={(e) => setPostData({ ...postData, message: e.target.value })}/>
                <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags}
                onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}/>
                <StyledFileInput>
                    Image
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={({base64}) => setPostData({...postData, selectedFile:base64})}
                    />
                </StyledFileInput>
                
                <StyledButton variant='contained' color="secondary" size='large' type='submit'>Submit</StyledButton>
                <StyledButton variant='contained' color='secondary' size='small' onClick={clear}>Clear</StyledButton>
                
            </StyledForm>
        </StyledPaper>
    )
}

export default Form;