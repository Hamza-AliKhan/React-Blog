import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  CardActionArea,
  Grid,
  Pagination,
  Stack,
  Typography,
  Skeleton,
} from "@mui/material";
import PostView from "./PostView.js";
import AlertSnackBar from "./AlertSnackBar.js";
import { TransitionEffect } from "./TransitionEffect.js";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../actions/postActions.js";
import { setOpenError, setSelectedPostId } from "../slices/postSlice.js";

function PostList({darkMode}) {
  const posts = useSelector((state) => state.app.postList.posts.posts);
  const loading = useSelector((state) => state.app.postList.posts.loading);
  const error = useSelector((state) => state.app.postList.posts.error);
  const openError = useSelector((state) => state.app.postList.posts.openError);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const selectedPostId = useSelector((state) => state.app.postList.posts.selectedPostId);

  useEffect(() => {
   
      dispatch(fetchPosts());
    
  }, [dispatch]);

  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (event, value) => setCurrentPage(value);

  const handlePostClick = (postId) => {
    dispatch(setSelectedPostId(postId));
  };

  const handleBackToPosts = () => {
    dispatch(setSelectedPostId(null));
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      dispatch(setOpenError(false));
    }
    dispatch(setOpenError(false));
  };

  return (
    <Grid
      container
      spacing={3}
      sx={{ paddingBottom: "2rem", paddingLeft: "1rem" }}
    >
      <Grid item xs={12}>
        <TransitionEffect threshold={100} timeout={2000} method="zoom">
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
            <Box sx={{
              background:
                (darkMode?("rgba(45,45,45,1)"):("rgba(142, 23, 33,0.95)")), 
              color:
                (darkMode ? ('#ffffff'):('#ffffff')), 
              height:'100%',
              boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              borderRadius: '4px',
              paddingX:'0.5rem'
              }}>
                Posts
              </Box>
          </Typography>
        </TransitionEffect>
        {error && (
          <AlertSnackBar
            error={error}
            severity="error"
            open={openError}
            handleClose={handleClose}
          />
        )}
        {loading && (
          <Stack spacing={4}>
            {[...Array(itemsPerPage)].map((_, index) => (
              <Card key={index}>
                <CardContent>
                  <Skeleton
                    animation="wave"
                    height={40}
                    width="80%"
                    style={{ marginBottom: 6 }}
                  />
                  <Skeleton animation="wave" height={30} width="100%" />
                  <Skeleton animation="wave" height={20} width="60%" />
                </CardContent>
              </Card>
            ))}
          </Stack>
        )}
      </Grid>
      {!selectedPostId && (
        <Stack spacing={4}>
          {currentPosts.map((post) => (
            <TransitionEffect threshold={150} timeout={2500} method="zoom">
              <Card
                sx={{
                  boxShadow:
                    "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                }}
                key={post.id}
              >
                <TransitionEffect threshold={175} timeout={2500} method="zoom">
                  <CardActionArea onClick={() => handlePostClick(post.id)}>
                    <CardContent>
                      <Typography variant="h6" component="h3">
                        {post.title}
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary">
                        {post.body}
                      </Typography>
                      <Typography variant="subtitle2" color="primary">
                        Continue reading...
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </TransitionEffect>
              </Card>
            </TransitionEffect>
          ))}
          <Pagination
            count={Math.ceil(posts.length / itemsPerPage)}
            page={currentPage}
            onChange={paginate}
            color="primary"
          />
        </Stack>
      )}

      {selectedPostId && (
        <PostView postId={selectedPostId} onBack={handleBackToPosts} />
      )}
    </Grid>
  );
};

export default PostList;
