import * as React from "react";
import { Container, Typography } from "@mui/material/";
import { Box } from "@mui/material";

export default function Footer() {
  return (
    <>
      <Container>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: "0.5rem",
          }}
        >
          <Typography variant="subtitle1">© Blog Footer</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: "2rem",
          }}
        >
          <Typography variant="subtitle2">Copyright © Blog , 2024.</Typography>
        </Box>
      </Container>
    </>
  );
}
