import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postComments } from "./ResponseInterceptor.js";
import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Pagination,
  Typography,
  IconButton,
  TextField,
  Skeleton,
} from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import { TransitionEffect } from "./TransitionEffect.js";
import AlertSnackBar from "./AlertSnackBar.js";
import { fetchComments } from "../actions/commentActions.js";
import { setOpenAlert, setOpenError } from "../slices/postViewSlice.js";
import {fetchPostView} from "../actions/postActions.js";

const PostView = ({ postId, onBack }) => {
  const post = useSelector((state) => state.app.postList.postView.currentPost);
  //when not using fake API JSON Placeholder comments is directly used instead of the updated comments
  //const comments = useSelector(state => state.app.postView.comments);
  //updated comments is used for local manupulation and display only
  //because doesn't support POST for comments 
  const [updatedComments, setUpdatedComments] = useState([]);
  const loading = useSelector((state) => state.app.postList.postView.loading);
  const openAlert = useSelector((state) => state.app.postList.postView.openAlert);
  const openError = useSelector((state) => state.app.postList.postView.openError);
  const errors = useSelector((state) => state.app.postList.postView.error);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const dispatch = useDispatch();
  const [commentData, setCommentData] = useState({
    postId: postId,
    id: 501,
    name: "",
    email: "",
    body: "",
  });

  useEffect(() => {
    dispatch(fetchPostView(postId));
    dispatch(fetchComments(postId)).then((response) =>
      setUpdatedComments(response.payload)
    );
    
  }, [postId, dispatch]);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentComments = updatedComments.slice(indexOfFirst, indexOfLast);

  const paginate = (event, value) => {
    setCurrentPage(value);
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setCommentData({
      ...commentData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    setCommentData({
      ...commentData,
      postId: postId,
      
      name: commentData.name,
      email: commentData.email,
      body: commentData.body,
    });
    e.preventDefault();
    try {
      const response = await postComments(postId, commentData);
      console.log("Posted comments on Server:", response);
      //when not using fake API JSON Placeholder because doesn't support POST for comments 
      //setComments(prevState => [commentData, ...prevState]);
      setUpdatedComments((prevState) => [commentData, ...prevState]);
      //console.log('Posted comment in commentData:', commentData);
      console.log("Posted comment in UpdatedComments:", updatedComments);
      dispatch(setOpenAlert(true));
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      dispatch(setOpenAlert(false));
      dispatch(setOpenError(false));
    }
    dispatch(setOpenError(false));
    dispatch(setOpenAlert(false));
  };

  return (
    <Grid container spacing={3}>
      {openAlert && (
        <AlertSnackBar
          error="Comment Posted SuccessFully"
          severity="success"
          open={openAlert}
          handleClose={handleClose}
        />
      )}
      {loading && (
        <Grid item xs={12}>
          <Box textAlign="center" sx={{ paddingLeft: "1rem" }}>
            <Button
              onClick={onBack}
              variant="contained"
              size="small"
              color="primary"
              sx={{ mb: 2 }}
            >
              Back to Posts
            </Button>
          </Box>
          {errors && (
            <AlertSnackBar
              error={errors}
              severity="error"
              open={openError}
              handleClose={handleClose}
            />
          )}
          <Grid sx={{ paddingLeft: "2rem" }}>
            <Typography variant="h4" mt={2}>
              <Skeleton variant="text" width="90%" height={200}></Skeleton>
            </Typography>
            <Typography variant="body1">
              <Skeleton variant="text" width="60%" height={100}></Skeleton>
            </Typography>
            <Typography variant="h5" component="p">
              Comments
            </Typography>

            <List>
              {[...Array(5)].map((_, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={`Name:`}
                    secondary={
                      <>
                        <Typography variant="body2" component="span">
                          Email:
                          <Skeleton
                            variant="text"
                            width="30%"
                            height={50}
                          ></Skeleton>{" "}
                        </Typography>
                        <Typography variant="body2" component="p">
                          ---
                          <Skeleton
                            variant="text"
                            width="50%"
                            height={50}
                          ></Skeleton>
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      )}
      {post && (
        <Grid item xs={12}>
          <TransitionEffect threshold={100} timeout={2000} method="zoom">
            <Box textAlign="center" sx={{ paddingLeft: "1rem" }}>
              <Button
                onClick={onBack}
                variant="contained"
                size="small"
                color="primary"
                sx={{ mb: 2 }}
              >
                Back to Posts
              </Button>
              <Typography >{post.id}</Typography>

            </Box>
          </TransitionEffect>
          <Grid sx={{ paddingLeft: "2rem" }}>
            <Typography variant="h4" mt={2}>
              <TransitionEffect threshold={120} timeout={3500} method="zoom">
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingTop: "2rem",
                  }}
                >
                  {post.title}
                </Typography>
              </TransitionEffect>
            </Typography>

            <Typography>
              <TransitionEffect threshold={120} timeout={4000} method="zoom">
                <Typography variant="body1">{post.body}</Typography>
              </TransitionEffect>
              <Box sx={{ paddingTop: "2rem", paddingBottom: "2rem" }}>
                <TransitionEffect threshold={140} timeout={5000} method="grow">
                  <form onSubmit={handleSubmit}>
                    <Typography variant="h6" gutterBottom>
                      Post a Comment
                    </Typography>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <TextField
                          required
                          name="name"
                          label="Name"
                          fullWidth
                          value={commentData.name}
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          name="email"
                          label="Email"
                          fullWidth
                          value={commentData.email}
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          name="body"
                          label="Comment"
                          fullWidth
                          multiline
                          rows={4}
                          value={commentData.body}
                          onChange={handleChange}
                        />
                      </Grid>
                    </Grid>
                    <IconButton
                      type="submit"
                      edge="end"
                      aria-label="comments"
                      variant="contained"
                      color="primary"
                    >
                      <CommentIcon />
                    </IconButton>
                  </form>
                </TransitionEffect>
              </Box>
              <TransitionEffect threshold={120} timeout={4000} method="grow">
                <Typography variant="h5" mt={3}>
                  Comments
                </Typography>
              </TransitionEffect>
            </Typography>

            <List>
              {currentComments.map((comment) => (
                <ListItem key={comment.id}>
                  <TransitionEffect
                    key={comment.id}
                    threshold={120}
                    timeout={4000}
                    method="grow"
                  >
                    <ListItemText
                      primary={`Name: ${comment.name}`}
                      secondary={
                        <>
                          <Typography variant="body2" component="span">
                            Email: {comment.email}
                          </Typography>
                          <Typography variant="body2" component="p">
                            --- {comment.body}
                          </Typography>
                        </>
                      }
                    />
                  </TransitionEffect>
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      )}
      <Pagination
        count={Math.ceil(updatedComments.length / itemsPerPage)}
        page={currentPage}
        onChange={paginate}
        color="primary"
        sx={{ marginTop: "2rem" }}
      />
    </Grid>
  );
};

export default PostView;
