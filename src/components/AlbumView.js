import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import fetchAlbumPhotosAsync from "../actions/albumPhotoActions.js";
import { TransitionEffect } from "./TransitionEffect.js";
import { Photos } from "./Photos.js";
import { isMobile } from "react-device-detect";
import AlertSnackBar from "./AlertSnackBar.js";
import {
  Button,
  Box,
  Grid,
  Pagination,
  Typography,
  Skeleton,
} from "@mui/material";
import {
  setCurrentPage,
  setMobileCheck,
  setOpenImage,
  setOpenError,
  setImageLink,
} from  "../slices/albumPhotoSlice.js";

const AlbumView = ({ postId, onBack }) => {
  const post = useSelector((state) => state.app.albumPhotos.currentAlbum);
  const albumPhoto = useSelector((state) => state.app.albumPhotos.albumPhoto);
  const loading = useSelector((state) => state.app.albumPhotos.loading);
  const error = useSelector((state) => state.app.albumPhotos.error);
  const mobileCheck = useSelector((state) => state.app.albumPhotos.mobileCheck);
  const currentPage = useSelector((state) => state.app.albumPhotos.currentPage);
  const openError = useSelector((state) => state.app.albumPhotos.openError);
  const openImage = useSelector((state) => state.app.albumPhotos.openImage);
  const imageLink = useSelector((state) => state.app.albumPhotos.imageLink);
  const itemsPerPage = useSelector((state) => state.app.albumPhotos.itemsPerPage);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isMobile) {
      dispatch(setMobileCheck("330px"));
    } else {
      dispatch(setMobileCheck("240px"));
    }
    
    dispatch(fetchAlbumPhotosAsync(postId));
    
  }, [dispatch, postId]);
  
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return (dispatch(setOpenError(false)));
    }
    if (reason === "backdropClick") {
      return (dispatch(setOpenImage(false)), (dispatch(setImageLink(null))));
    }
    dispatch(setOpenError(false));
  };
  
  const handleImage = (value) => {
    dispatch(setImageLink(value));
    dispatch(setOpenImage(true));
  };

  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentPhotos = albumPhoto.slice(
    indexOfFirstPost, 
    indexOfLastPost
    );

  const paginate = (event, pageNumber) => {
    dispatch(setCurrentPage(pageNumber));
  };
  

  return (
    <Grid container spacing={3} sx={{ paddingBottom: "2rem" }}>
      {loading && (
        <Grid item xs={12}>
          <Box textAlign="center" sx={{ paddingLeft: "2rem" }}>
            <Button
              onClick={onBack}
              variant="contained"
              size="small"
              color="primary"
              sx={{ mb: 2 }}
            >
              Back to Albums
            </Button>
          </Box>
          <Box textAlign="center" sx={{ paddingBottom: "2rem" }}>
            <Typography variant="h4">
              <Skeleton variant="text" height={40} width={"100%"} />
            </Typography>
            <Typography variant="subtitle1">
              Album: <Skeleton variant="text" height={20} width={"100%"} />
            </Typography>
            <Typography variant="h4" mt={4}>
              Photos
            </Typography>
          
          {error && (
          <AlertSnackBar
            error={error}
            severity="error"
            open={openError}
            handleClose={handleClose}
          />
          )}
          </Box>
          
          <Grid container spacing={2}>
            {[...Array(itemsPerPage)].map((_, index) => (
              <Grid key={index} item xs={12} sm={6} md={3}>
                <Skeleton variant="rounded" height={290} width={220} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      )}
      
      {post && (
        <Grid item xs={12}>
          <TransitionEffect threshold={110} timeout={2000} method="zoom">
            <Box textAlign="center" sx={{ paddingLeft: "2rem" }}>
              <Button
                onClick={onBack}
                variant="contained"
                size="small"
                color="primary"
                sx={{ mb: 2 }}
              >
                Back to Albums
              </Button>
            </Box>
          </TransitionEffect>
          <TransitionEffect threshold={125} timeout={2200} method="zoom">
            <Box textAlign="center" sx={{ paddingBottom: "2rem" }}>
              <Typography variant="h4">{post.id}</Typography>
              <Typography variant="subtitle1">Album: {post.title}</Typography>
              <Typography variant="h4" mt={4}>
                Photos
              </Typography>
            </Box>
          </TransitionEffect>

          <Grid
            container
            columnSpacing={{ md: 12 }}
            rowSpacing={2}
            sx={{
              paddingTop: "2rem",
              paddingLeft: "1rem",
              paddingRight: "1rem",
            }}
          >
            <Photos
              currentList={currentPhotos}
              albumId={post.id}
              open={openImage}
              image={imageLink}
              handleClose={handleClose}
              handleImage={handleImage}
              mobileCheck={mobileCheck}
            />
          </Grid>
        </Grid>
      )}
      <Pagination
        count={Math.ceil(albumPhoto.length / itemsPerPage)}
        page={currentPage}
        onChange={paginate}
        color="primary"
        sx={{ marginTop: "2rem" }}
      />
    </Grid>
  );
};

export default AlbumView;
