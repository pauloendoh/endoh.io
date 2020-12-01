import { Box, CircularProgress } from "@material-ui/core";
import React from "react";
import FlexCenter from "../../components/shared/Flexboxes/FlexCenter";

function LoadingPage() {
  return (
    <Box
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <FlexCenter flexDirection="column">
        <CircularProgress />
        <Box mt={2}>Loading</Box>
      </FlexCenter>
    </Box>
  );
}

export default LoadingPage;
