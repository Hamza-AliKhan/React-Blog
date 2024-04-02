import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography
} from "@mui/material";
import Photos from "./Photos.js";
import TransitionEffect from './TransitionEffect.js';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {fetchAlbumPhotosAsync} from  "../actions/albumPhotoActions.js";

export function Albums({ homePag, id, album, photo, open, imageLink, handleClose, handleImage }) {
    const dispatch = useDispatch();
    useEffect(() => {
        if(photo.length === 0){
        dispatch(fetchAlbumPhotosAsync(id));
        }
    },[photo, dispatch,id]);
    
    
    return (
      <Grid sx={{width:'600px'}}>
        {homePag === "true" ? (
            album.map(
          (album) =>
            album.id === id && (
            <Grid>
                <TransitionEffect threshold={25} timeout={6500} method="zoom">
                  <Card
                    key={id}
                    sx={{
                      background: "rgba(0,0,0,0)",
                      width: "50%",
                      display: "flex",
                      boxShadow:
                        "1px 1px 1px 1px rgba(0, 0, 0, 0.2), 1px 1px 1px 1px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <CardContent>
                        <Typography color="secondary">
                          {" "}
                          {album.title}
                        </Typography>
                      </CardContent>
                    </Box>
                    <Photos
                    key={id}
                      albumId={album.id}
                      photo={photo}
                      image={imageLink}
                      open={open}
                      handleClose={handleClose}
                      handleImage={handleImage}
                    />
                  </Card>
                </TransitionEffect>
              </Grid>
        )))
        :
         (album.map(
          (album) =>
            album.id === id && (
              <Grid>
                <TransitionEffect threshold={25} timeout={6500} method="zoom">
                  <Card
                    key={id}
                    sx={{
                      background: "rgba(0,0,0,0)",
                      width: "50%",
                      display: "flex",
                      boxShadow:
                        "1px 1px 1px 1px rgba(0, 0, 0, 0.2), 1px 1px 1px 1px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <CardContent>
                        <Typography color="secondary">
                          {" "}
                          {album.title}
                        </Typography>
                      </CardContent>
                    </Box>
                    <Photos
                      albumId={album.id}
                      photo={photo}
                      image={imageLink}
                      open={open}
                      handleClose={handleClose}
                      handleImage={handleImage}
                    />
                  </Card>
                </TransitionEffect>
              </Grid>
            )
         ))
        }
      </Grid>
    );
  }

  export default  Albums;