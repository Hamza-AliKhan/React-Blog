import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchComments } from "../actions/commentActions";
import { Box, Grid, Pagination, Stack, Typography, Skeleton } from "@mui/material";
import { Comments } from "./Comments.js";
import { TransitionEffect } from "./TransitionEffect.js";
import AlertSnackBar from "./AlertSnackBar.js";
import { setOpenError } from "../slices/commentsSlice.js";

export default function CommentList ({darkMode}) {
const comments = useSelector((state) => state.app.commentList.comments);
  const loading = useSelector((state) => state.app.commentList.loading);
  const error = useSelector((state) => state.app.commentList.error);
  const dispatch = useDispatch();

  useEffect(() => {
   
      dispatch(fetchComments());
    
  }, [ dispatch]);

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = React.useState(1);
  const openError = useSelector((state) => state.app.commentList.openError);

  const indexOfLastComment = currentPage * itemsPerPage;
  const indexOfFirstComment = indexOfLastComment - itemsPerPage;
  const currentComments = comments.slice(
    indexOfFirstComment,
    indexOfLastComment
  );

  const paginate = (event, value) => setCurrentPage(value);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return dispatch(setOpenError(false));
    }
    dispatch(setOpenError(false));
  };

  return (
    <Grid container spacing={3} sx={{ paddingBottom: "2rem" }}>
      <Grid item xs={12}>
        <TransitionEffect threshold={100} timeout={1000} method="zoom">
          
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
                Comments
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
          <Stack spacing={2} sx={{ paddingTop: "2rem" }}>
            {[...Array(itemsPerPage)].map((_, index) => (
              <Skeleton
                key={index}
                variant="rounded"
                animation="wave"
                height={100}
              ></Skeleton>
            ))}
          </Stack>
        )}
      </Grid>
       {comments &&( 
      <Stack spacing={4} sx={{ paddingBottom: "2rem" }}>
        
        <Comments
          id={"comments"}
          comments={currentComments}
          TransitionEffect={TransitionEffect}
        />
        
        <Pagination
          count={Math.ceil(comments.length / itemsPerPage)}
          page={currentPage}
          onChange={paginate}
          color="primary"
          sx={{ paddingTop: "1rem" }}
        />
      </Stack>
    )}
    </Grid>
  );
};

