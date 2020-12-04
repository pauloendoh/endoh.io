import { Box, Button, Typography } from "@material-ui/core";
import TextSecondary from "components/shared/Text/TextSecondary";
import PATHS from "consts/PATHS";
import React from "react";
import { Link, useLocation } from "react-router-dom";

// PE 1/3 - Seems like it has weird responsibilities
const MonerateDescription = () => {
  const location = useLocation();
  return (
    <Box maxWidth={400} id="monerate-description">
      <Typography variant="h4">Monerate</Typography>
      <Typography variant="subtitle1">
        A <TextSecondary>budget tool</TextSecondary> where you can{" "}
        <TextSecondary>rate your expenses</TextSecondary>
      </Typography>

      {location.pathname.includes("login") ? null : (
        <Box mt={2}>
          <Link to={PATHS.monerate.index} style={{ textDecoration: "none" }}>
            <Button variant="contained" color="primary">
              Check /monerate
            </Button>
          </Link>
        </Box>
      )}
    </Box>
  );
};

export default MonerateDescription;
