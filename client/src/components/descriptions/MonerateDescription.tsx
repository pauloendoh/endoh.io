import { Box, Button, Typography } from "@material-ui/core";
import React from "react";
import { useLocation } from "react-router-dom";

// PE 1/3 - Seems like it has weird responsibilities 
const MonerateDescription = () => {
  const location = useLocation();
  return (
    <Box maxWidth={400} id="monerate-description">
      <Typography variant="h4">Monerate</Typography>
      <Typography variant="subtitle1">
        A budget tool where you can give scores to your expenses. 1 = “total
        waste of money”, 5 = “great deal”. It might give you more awareness of
        what to buy, eat, subscribe, etc.
      </Typography>

      {location.pathname.includes("login") ? null : (
        <Box mt={2}>
          <Button
            variant="contained"
            color="primary"
            href="/login?next=/monerate"
          >
            Check /monerate
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default MonerateDescription;
