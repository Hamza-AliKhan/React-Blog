import {
  Button,
  Card,
  CardContent,
  CardActionArea,
  CardActions,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { PhotoModal } from "./PhotoModal.js";
import { TransitionEffect } from "./TransitionEffect.js";

export function Photos({
  currentList,
  albumId,
  photo,
  open,
  image,
  handleImage,
  handleClose,
  mobileCheck,
}) {
  return (
    <>
      <>
        {!currentList &&
          photo.map(
            (photos) =>
              (photos.albumId===albumId &&(
                <>
                  <CardActionArea
                    key={photos.id}
                    onClick={() => handleImage(photos.url)}
                    sx={{ width: "40%" }}
                  >
                    <CardMedia  
                      component="img"
                      sx={{ width: "100%" }}
                      image={photos.thumbnailUrl}
                      alt={photos.title}
                    />
                  </CardActionArea>
                  <PhotoModal
                    open={open}
                    handleClose={handleClose}
                    image={image}
                  />
                </>
              ))
          )}
      </>

      <>
        {currentList &&
          currentList.map(
            (photo) =>
               (photo.albumId === albumId || albumId === "none") &&(
                <Grid item md={3}>
                  <TransitionEffect
                    key={photo.id}
                    threshold={95}
                    timeout={4000}
                    method="zoom"
                  >
                    <Card
                      key={photo.id}
                      sx={{
                        m: 0.5,
                        boxShadow:
                          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                        width: mobileCheck,
                      }}
                    >
                      <TransitionEffect
                        key={photo.id}
                        threshold={110}
                        timeout={6000}
                        method="grow"
                      >
                        <CardMedia
                          component="img"
                          image={photo.thumbnailUrl}
                          alt={photo.title}
                        />
                      </TransitionEffect>
                      <CardContent >
                        <Typography variant="subtitle1">
                          {photo.title}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button
                          key={photo.id}
                          onClick={(e) => handleImage(photo.url)}
                        >
                          View
                        </Button>
                        <PhotoModal
                          open={open}
                          handleClose={handleClose}
                          image={image}
                        />
                      </CardActions>
                    </Card>
                  </TransitionEffect>
                </Grid>
              )
          )}
      </>
    </>
  );
}

export default Photos;