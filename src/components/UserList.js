import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
  Typography,
} from "@mui/material";
import { TransitionEffect } from "./TransitionEffect.js";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserList } from "../actions/usersActions.js";
import AlertSnackBar from "./AlertSnackBar.js";
import { setOpenError } from "../slices/usersSlice.js";

export default function UserList({darkMode}) {
  const userList = useSelector((state) => state.app.users.userList);
  const loading = useSelector((state) => state.app.users.loading);
  const openError = useSelector((state) => state.app.users.openError);
  const error = useSelector((state) => state.app.users.error);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const dispatch = useDispatch();

  useEffect(() => {
    
      dispatch(fetchUserList());
    
  }, [dispatch]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
      xs="auto"
      sx={{ paddingBottom: "2rem", paddingLeft: "2rem" }}
    >
      <Grid item xs={12}>
      <TransitionEffect threshold={10} timeout={2000} method="zoom">
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
                Users
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
      </Grid>
      <TableContainer
        component={Paper}
        sx={{
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        }}
      >
        <Table aria-label="user table">
          <TableHead>
            <TransitionEffect threshold={150} timeout={1500} method="slide">
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Street</TableCell>
                <TableCell>Apt/Suite</TableCell>
                <TableCell>City</TableCell>
                <TableCell>Zipcode</TableCell>
                <TableCell>Latitute</TableCell>
                <TableCell>Longitute</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Website</TableCell>
                <TableCell>Company</TableCell>
              </TableRow>
            </TransitionEffect>
          </TableHead>
          <TableBody>
            {loading
              ? Array.from(Array(rowsPerPage).keys()).map((index) => (
                  <TableRow key={index}>
                    {Array.from(Array(13).keys()).map((index) => (
                      <TableCell key={index}>
                        <Skeleton variant="text" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
                 : 
                userList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user) => (
                    <TransitionEffect
                      key={user.id}
                      threshold={20}
                      timeout={2500}
                      method="slide"
                    >
                      <TableRow key={user.id}>
                        <TableCell>{user.id}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.username}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.address.street}</TableCell>
                        <TableCell>{user.address.suite}</TableCell>
                        <TableCell>{user.address.city}</TableCell>
                        <TableCell>{user.address.zipcode}</TableCell>
                        <TableCell>{user.address.geo.lat}</TableCell>
                        <TableCell>{user.address.geo.lng}</TableCell>
                        <TableCell>{user.phone}</TableCell>
                        <TableCell>{user.website}</TableCell>
                        <TableCell>{user.company.name}</TableCell>
                      </TableRow>
                    </TransitionEffect>
                  ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="Table"
                count={userList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Grid>
  );
}
