import { useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemText,
  Skeleton,
  Typography
} from "@mui/material";
import { isMobile } from "react-device-detect"
import { Comments } from "./Comments.js";
import { Albums } from "./Albums.js";
import { TransitionEffect } from "./TransitionEffect.js";
import { fetchPosts } from "../actions/postActions.js";
import { fetchComments } from "../actions/commentActions";
import { fetchAlbumsAsync } from "../actions/albumActions.js";
import AlertSnackBar from "./AlertSnackBar.js";
import { useDispatch, useSelector } from "react-redux";
import { setOpenError, setOpenImage, setImageLink, setMobileCheck  } from "../slices/homePageSlice.js";


export default function HomePage({darkMode}) {
  const posts = useSelector(state => state.app.homePage.homePosts);
  const homeComments = useSelector(state => state.app.homePage.homeComments);
  const albumList = useSelector(state => state.app.homePage.homeAlbumList);
  const albumPhoto = useSelector(state => state.app.homePage.homeAlbumPhoto);
  const imageLink = useSelector(state => state.app.homePage.imageLink);   
  const loading = useSelector(state => state.app.homePage.loading);
  const error = useSelector(state => state.app.homePage.error);
  const mobileCheck = useSelector(state => state.app.homePage.mobileCheck);
  const open = useSelector(state => state.app.homePage.openImage);
  const openError = useSelector(state => state.app.homePage.openError)
  const dispatch = useDispatch();

  useEffect(() => {
    if (isMobile) {
      dispatch(setMobileCheck(12));
    } else {
      dispatch(setMobileCheck(6));
    }
    if (posts.length === 0 && albumList.length === 0) {
      dispatch(fetchPosts());
      dispatch(fetchComments()); 
      dispatch(fetchAlbumsAsync());
     }
  }, [posts, albumList, dispatch]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return dispatch(setOpenError(false));
    }
    if (reason === "backdropClick") {
      return (dispatch(setOpenImage(false)), dispatch(setImageLink(null)));
    }
    dispatch(setOpenError(false));
  };
  
  const handleImage = (value) => {
    dispatch(setImageLink(value));
    dispatch(setOpenImage(true));
  };

  
  return (
    <Grid container spacing={4} sx={{paddingBottom: "2rem"}}>
      <Grid item xs={12}>
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
                HomePage
              </Box>
        </Typography>
        {error && (
          <AlertSnackBar
            error={error}
            severity="error"
            open={openError}
            handleClose={handleClose}
          />
        )}
        {/*Skeleton*/}
        {loading && (
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            sx={{ marginBottom: 6 }}
          >
            {[...Array(2)].map((_, index) => (
              <Grid key={index} item xs={6}>
                <Card
                  sx={{
                    boxShadow:
                      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                  }}
                  key={posts.id}
                >
                  <CardContent>
                    <Typography>
                      <Skeleton
                        animation="wave"
                        variant="text"
                        sx={{ fontSize: "2rem" }}
                        height={30}
                        width="60%"
                        style={{ marginBottom: 6 }}
                      />
                    </Typography>
                    <Typography>
                      <Skeleton
                        animation="wave"
                        variant="text"
                        sx={{ fontSize: "2rem" }}
                        height={60}
                        width="100%"
                      />
                    </Typography>
                    <Typography variant="subtitle2" color="primary">
                      <List>
                        <ListItem>
                          <ListItemText
                            variatn="caption"
                            primary={`Popular Comment:`}
                            secondary={
                              <>
                                <Typography>
                                  <Skeleton
                                    animation="wave"
                                    variant="text"
                                    sx={{ fontSize: "2rem" }}
                                    height={30}
                                    width="30%"
                                  />
                                </Typography>
                                <Typography>
                                  <Skeleton
                                    animation="wave"
                                    variant="text"
                                    sx={{ fontSize: "2rem" }}
                                    height={60}
                                    width="100%"
                                  />
                                </Typography>
                              </>
                            }
                          />
                        </ListItem>
                      </List>

                      <Card
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
                            <Typography>
                              <Skeleton
                                animation="wave"
                                variant="text"
                                sx={{ fontSize: "28rem" }}
                                height={25}
                                width="100%"
                              />
                            </Typography>
                            <Typography>
                              <Skeleton
                                animation="wave"
                                variant="text"
                                sx={{ fontSize: "28rem" }}
                                height={25}
                                width="100%"
                              />
                            </Typography>
                          </CardContent>
                        </Box>
                        <Skeleton
                          animation="wave"
                          variant="text"
                          height={75}
                          width={75}
                        />
                      </Card>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {posts.map((post ) => (
            (
            <TransitionEffect threshold={10} timeout={2500} method="zoom">
              <Grid
                item
                key={'grid'+post.id}
                xs={mobileCheck}
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: '100%',
                }}
              >
                <Card
                  sx={{
                    boxShadow:
                      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                  }}
                  key={'card'+post.id}
                >
                  <CardContent>
                    <TransitionEffect
                      threshold={-1}
                      timeout={4500}
                      method="zoom"
                    >
                      <Typography variant="subtitle1" component="h3">
                        {post.title}
                      </Typography>
                    </TransitionEffect>

                    <TransitionEffect
                      threshold={-1}
                      timeout={5500}
                      method="zoom"
                    >
                      <Typography variant="subtitle1" color="text.secondary">
                        {post.body}
                      </Typography>
                    </TransitionEffect>

                    <Typography variant="subtitle2" color="primary">
                      <Comments
                        key={'comments'+post.id}
                        homePag="true"
                        commentTitle={"Popular Comment"}
                        comments={homeComments}
                        id={post.id}
                        TransitionEffect={TransitionEffect}
                      />
                      
                      
                      <Albums key={'albums'+post.id} homePag={"true"} id={post.id} album={albumList} photo={albumPhoto} open={open} imageLink={imageLink} handleClose={handleClose} handleImage={handleImage} />
                       
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </TransitionEffect>
          )))}
        </Grid>
      </Grid>
    </Grid>
  );
}
