import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Box } from "@mui/system";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import {
  AppBar,
  Button,
  Card,
  CardMedia,
  Container,
  Drawer,
  Fade,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  IconButton,
  Skeleton,
} from "@mui/material/";
import { useDispatch, useSelector } from "react-redux";
import { setBackground, setOpenDrawer, setTransition, setLoading } from '../slices/headerSlice.js';

export default function Header({ darkMode, onDarkModeToggle }) {
  const background = useSelector(state => state.app.header.background);
  const location = useLocation();
  const openDrawer = useSelector(state => state.app.header.openDrawer);
  const transition = useSelector(state => state.app.header.transition);
  const loading = useSelector(state => state.app.header.loading);
  const dispatch = useDispatch();
  
  function handleBackgroundChange (value) {
    dispatch(setOpenDrawer(false));
    dispatch(setLoading(true));
    dispatch(setTransition(false));
    (setTimeout(() => {
      dispatch(setTransition(true));
      dispatch(setLoading(false));
      dispatch(setBackground(value));
    }, 500));
  };

  const toggleDrawer = (e) => () => {
    dispatch(setOpenDrawer(e));
  };

  useEffect(() => {
    switch (location.pathname) {
      case "/posts":
        handleBackgroundChange("posts");
        break;
      case "/comments":
        handleBackgroundChange("comments");
        break;
      case "/albums":
        handleBackgroundChange("albums");
        break;
      case "/photos":
        handleBackgroundChange("photos");
        break;
      case "/users":
        handleBackgroundChange("users");
        break;
      default:
        handleBackgroundChange("home");
        break;
    }
  }, [location.pathname]);

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography
            sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}
          >
            <Button
              variant="text"
              component={Link}
              to="/"
              onClick={() => handleBackgroundChange("home")}
              sx={{ color: "#fff" }}
            >
              B&nbsp;L&nbsp;O&nbsp;G
            </Button>
          </Typography>
          <IconButton onClick={onDarkModeToggle} sx={{ color: "#fff" }}>
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <Button onClick={toggleDrawer(true)} sx={{ color: "#fff" }}>
            <MenuIcon />
          </Button>

          <Drawer
            anchor="right"
            open={openDrawer}
            onClose={toggleDrawer(false)}
            hideBackdrop={false}
            ModalProps={{
              keepMounted: true,
            }}
            
          >
            <List sx={{background:(darkMode?("rgba(45,45,45,1)"):("rgba(102, 23, 33,1)")), color:(darkMode ? ('#ffffff'):('#ffffff')), height:'100%'}}>
              <ListItem key="posts" disablePadding>
                <ListItemButton
                  component={Link}
                  to="/posts"
                  onClick={() => handleBackgroundChange("posts")}
                >
                  <ListItemText>Posts</ListItemText>
                </ListItemButton>
              </ListItem>
              <ListItem key="comments" disablePadding>
                <ListItemButton
                  component={Link}
                  to="/comments"
                  onClick={() => handleBackgroundChange("comments")}
                >
                  <ListItemText>Comments</ListItemText>
                </ListItemButton>
              </ListItem>
              <ListItem key="albums" disablePadding>
                <ListItemButton
                  component={Link}
                  to="/albums"
                  onClick={() => handleBackgroundChange("albums")}
                >
                  <ListItemText>Albums</ListItemText>
                </ListItemButton>
              </ListItem>
              <ListItem key="photos" disablePadding>
                <ListItemButton
                  component={Link}
                  to="/photos"
                  onClick={() => handleBackgroundChange("photos")}
                >
                  <ListItemText>Photos</ListItemText>
                </ListItemButton>
              </ListItem>
              <ListItem key="users" disablePadding>
                <ListItemButton
                  component={Link}
                  to="/users"
                  onClick={() => handleBackgroundChange("users")}
                >
                  <ListItemText>Users</ListItemText>
                </ListItemButton>
              </ListItem>
            </List>
          </Drawer>
        </Toolbar>
      </AppBar>

      <Container xs={12} sx={{ pt: 2 }}>
        <Card
          sx={{
            m: 0.5,
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          }}
        >
          <Box sx={{ position: "relative" }}>
            {loading ? (
              <Skeleton variant="rounded" height={450}></Skeleton>
            ) : (
              <Fade in={transition} timeout={1000}>
                <CardMedia
                  component="img"
                  height="450"
                  image={require("../img/" + background + "-bg.jpg")}
                  alt="background"
                  sx={{ objectFit: "cover" }}
                />
              </Fade>
            )}
            <Card
              sx={{
                position: "absolute",
                bottom: 10,
                left: 10,
                width: "160px",
                bgcolor: "rgba(255, 255, 255, 0.5)",
                color: "White",
                padding: "1.5px",
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              }}
            >
              <Card
                sx={{
                  padding: "2px",
                  color: "white",
                  bgcolor: "rgba(0,0,0,0.7)",
                }}
              >
                <Typography variant="h6">JSON Blog</Typography>
                <Typography variant="subtitle2">A JsonPlaceHolder</Typography>
                <Typography variant="subtitle2"> Blog Project</Typography>
                <Typography variant="subtitle2"> Using Material UI</Typography>
              </Card>
            </Card>
          </Box>
        </Card>
      </Container>
    </>
  );
}
