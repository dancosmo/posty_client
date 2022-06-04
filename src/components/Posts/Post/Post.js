import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts";

import moment from "moment";

import styled from "styled-components";

//-----------<ComponentStyles>----------------

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: space-between !important;
  border-radius: 15px !important;
  height: 100%;
  position: relative;
`;

const StyledCardMedia = styled(CardMedia)`
  height: 0;
  padding-top: 56.25%;
  background-color: rgba(0, 0, 0, 0.5);
  background-blend-mode: darken;
`;

const OverlayOne = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  color: white;
`;
const OverlayTwo = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  color: white;
`;

const Details = styled.div`
  display: flex;
  justifycontent: space-between !important;
  margin: 20px;
`;

const StyledCardActions = styled(CardActions)`
  padding: 0 16px 8px 16px;
  display: flex;
  justify-content: space-between !important;
`;

const StyledMessage = styled(Typography)`
  padding: 0 16px;
  max-height: 80px;
  overflow-y: scroll;
`;
//-----------</ComponentStyles>---------------

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("profile"));

  const getCurrentId = () => {
    setCurrentId(post._id);
  };

  const deleteCurrentPost = () => {
    dispatch(deletePost(post._id));
  };

  return (
    <StyledCard>
      <StyledCardMedia image={post.selectedFile} title={post.title} />
      <OverlayOne>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </OverlayOne>
      <OverlayTwo>
        {user?.result._id === post?.creator ||
        user?.result.googleId === post?.creator ? (
          <Button
            style={{ color: "white" }}
            size="small"
            onClick={() => getCurrentId()}
          >
            <MoreHorizIcon fontSize="default" />
          </Button>
        ) : null}
      </OverlayTwo>
      <Details>
        <Typography variant="body2" color="textSecondary">
          {post.tags.map((tag) => `#${tag}`)}
        </Typography>
      </Details>
      <CardContent>
        <Typography style={{ padding: "0 16px" }} variant="h5" gutterBottom>
          {post.title}
        </Typography>
      </CardContent>
      <CardContent>
        <StyledMessage variant="body" component="p">
          {post.message}
        </StyledMessage>
      </CardContent>
      <StyledCardActions>
        <Button
          size="small"
          disabled={!user?.result}
          color="secondary"
          onClick={() => dispatch(likePost(post._id))}
        >
          <ThumbUpAltIcon fontSize="small"></ThumbUpAltIcon>
          &nbsp;{post.likes.length}
        </Button>
        {user?.result._id === post?.creator ||
        user?.result.googleId === post?.creator ? (
          <Button
            size="small"
            color="secondary"
            onClick={() => deleteCurrentPost()}
          >
            <DeleteIcon fontSize="small"></DeleteIcon>
          </Button>
        ) : null}
      </StyledCardActions>
    </StyledCard>
  );
};

export default Post;
