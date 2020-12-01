import { Box, Typography } from "@material-ui/core";
import React from "react";
import Flex from '../shared/Flexboxes/Flex'

// PE 1/3 - Create <ColorPrimary> e <ColorSecondary>
const LandingPageDescription = () => {
  return (
    <Box maxWidth={350} >
      <Typography variant="h3">
        <Flex>
          {`</`}{" "}
          <Typography variant="inherit" color="primary">
            endoh.io
          </Typography>
          {`>`}
        </Flex>
      </Typography>
      <Box>
        {/* TODO: create a utils/SecondaryTxt */}
        <Typography variant="subtitle1">
          A <Typography variant="inherit" color="secondary">web application suite</Typography> where I will be developing and hosting some
          solutions. They’re mostly <Typography variant="inherit" color="secondary">self-awareness tools</Typography> evolved from my
          obsession with <Typography variant="inherit" color="secondary">spreadsheets</Typography> and <Typography variant="inherit" color="secondary"> Likert scale</Typography>.
        </Typography>
      </Box>
    </Box>
  );
};

export default LandingPageDescription;
