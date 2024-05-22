import React, { useEffect } from "react";
import { Box, Grid, Skeleton, Pagination, Typography } from "@mui/material";
import { isMobile } from "react-device-detect";
import { Photos } from "./Photos.js";
import { TransitionEffect } from "./TransitionEffect.js";
import { useDispatch, useSelector } from "react-redux";
import  fetchPhotoList  from "../actions/photoActions.js";
import {
  setCurrentPage,
  setMobileCheck,
  setOpenImage,
  setOpenError,
  setImageLink,
} from "../slices/photoSlice.js";
import AlertSnackBar from "./AlertSnackBar.js";

export default function PictureList ({darkMode}) {
  const pictureList = useSelector(state => state.app.photos.photoList);
  const loading = useSelector(state => state.app.photos.loading);
  const mobileCheck = useSelector(state => state.app.photos.mobileCheck);
  const openError = useSelector(state => state.app.photos.openError);
  const openImage = useSelector(state => state.app.photos.openImage);
  const imageLink = useSelector(state => state.app.photos.imageLink);
  const error = useSelector(state => state.app.photos.error);
  const dispatch = useDispatch();
  const itemsPerPage = useSelector(state => state.app.photos.itemsPerPage);
  const currentPage = useSelector(state => state.app.photos.currentPage);

  useEffect(() => {
    if (isMobile) {
      dispatch(setMobileCheck("330px"));
    } else {
      dispatch(setMobileCheck("240px"));
    }
  
      dispatch(fetchPhotoList());
  }, [dispatch ]);

  const indexOfLastPicture = currentPage * itemsPerPage;
  const indexOfFirstPicture = indexOfLastPicture - itemsPerPage;
  const currentpictureList = pictureList.slice(
    indexOfFirstPicture,
    indexOfLastPicture
  );

  const paginate = (event, pageNumber) => {
    dispatch(setCurrentPage(pageNumber));
  };

  const handleImage = (value) => {
    dispatch(setImageLink(value));
    dispatch(setOpenImage(true));
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return (dispatch(setOpenError(false)));
    }
    if (reason === "backdropClick") {
      return (dispatch(setOpenImage(false)), dispatch(setImageLink(null)));
    }
    dispatch(setOpenError(false));
  };
  return (
    <Grid container spacing={3} sx={{ paddingBottom: "2rem" }}>
      <Grid item xs={12}>
        <TransitionEffect threshold={100} timeout={2500} method="zoom">
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
                Photos
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
          <Grid container spacing={2}>
            {[...Array(itemsPerPage)].map((_, index) => (
              <Grid key={index} item md={3}>
                <Skeleton variant="rounded" height={300} width={250} />
              </Grid>
            ))}
          </Grid>
        )}
      </Grid>
        {!loading &&(
      <Grid
        container
        columnSpacing={{ md: 12 }}
        rowSpacing={2}
        sx={{ paddingTop: "2rem", paddingLeft: "1rem", paddingRight: "1rem" }}
      >
        <Photos
          currentList={currentpictureList}
          albumId="none"
          photo={null}
          open={openImage}
          image={imageLink}
          handleClose={handleClose}
          handleImage={handleImage}
          mobileCheck={mobileCheck}
        />
      </Grid>
      )}
      <Pagination
        count={Math.ceil(pictureList.length / itemsPerPage)}
        page={currentPage}
        onChange={paginate}
        color="primary"
        sx={{ marginTop: "2rem" }}
      />
    </Grid>
  );
};

