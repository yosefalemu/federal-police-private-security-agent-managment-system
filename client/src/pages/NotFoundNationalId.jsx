import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const NotFoundNationalId = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="80vh"
    >
      <Typography variant="h2" color="textPrimary" gutterBottom>
        Oops! Page Not Found
      </Typography>
      <Typography variant="h5" color="textSecondary" paragraph>
        You haven't submitted your documents yet; please make use of the apply
        link.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/"
        size="large"
      >
        Go to Home
      </Button>
    </Box>
  );
};

export default NotFoundNationalId;
