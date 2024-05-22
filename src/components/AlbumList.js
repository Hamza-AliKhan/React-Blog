import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  Pagination,
  Skeleton,
} from "@mui/material";
import AlbumView from "./AlbumView.js";
import AlertSnackBar from "./AlertSnackBar.js";
import fetchAlbumsAsync from "../actions/albumActions.js";
import { TransitionEffect } from "./TransitionEffect.js";
import { setSelectedAlbumId, setOpenError } from "../slices/albumSlice.js";

function AlbumList({darkMode}) {
  const albumlist = useSelector((state) => state.app.albums.albumList);
  const loading = useSelector((state) => state.app.albums.loading);
  const openError = useSelector((state) => state.app.albums.openError);
  const error = useSelector((state) => state.app.albums.error);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const selectedAlbumId = useSelector((state) => state.app.albums.selectedAlbumId);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    
      dispatch(fetchAlbumsAsync());
    
  }, [dispatch]);

  const indexOfLastAlbum = currentPage * itemsPerPage;
  const indexOfFirstAlbum = indexOfLastAlbum - itemsPerPage;
  const currentAlbumlist = albumlist.slice(indexOfFirstAlbum, indexOfLastAlbum);

  const paginate = (event, value) => {
    setCurrentPage(value);
  };

  const handlePostClick = (postId) => {
    dispatch(setSelectedAlbumId(postId));
  };

  const handleBackToPosts = () => {
    dispatch(setSelectedAlbumId(null));
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return dispatch(setOpenError(false));
    }
    dispatch(setOpenError(false));
  };

  return (
    <Grid container spacing={3} sx={{ paddingBottom: "2rem" }}>
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
                Albums
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
              <Grid key={index} item xs={12} md={6}>
                <Skeleton variant="rounded" height={100} />
              </Grid>
            ))}
          </Grid>
        )}
      </Grid>
      {!selectedAlbumId && (
        <Grid container spacing={2} sx={{ paddingTop: "2rem" }}>
          {currentAlbumlist.map((album) => (
            <Grid key={album.id} item xs={12} md={6}>
              <TransitionEffect threshold={125} timeout={2500} method="zoom">
                <Card
                  sx={{
                    boxShadow:
                      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                  }}
                >
                  <CardActionArea
                    onClick={() => handlePostClick(album.id)}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "1rem",
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6">{album.title}</Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </TransitionEffect>
            </Grid>
          ))}
          <Pagination
            count={Math.ceil(albumlist.length / itemsPerPage)}
            page={currentPage}
            onChange={paginate}
            color="primary"
            sx={{ marginTop: "2rem" }}
          />
        </Grid>
      )}
      {selectedAlbumId && (
        <AlbumView postId={selectedAlbumId} onBack={handleBackToPosts} />
      )}
    </Grid>
  );
}

export default AlbumList;
