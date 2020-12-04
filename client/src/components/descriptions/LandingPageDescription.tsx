import { Box, Typography } from "@material-ui/core";
import React from "react";
import Flex from "../shared/Flexboxes/Flex";
import TextPrimary from "../shared/Text/TextPrimary";
import TextSecondary from "../shared/Text/TextSecondary";
// PE 1/3 - Create <ColorPrimary> e <ColorSecondary>
const LandingPageDescription = () => {
  return (
    <Box maxWidth={350}>
      <Typography variant="h3">
        <Flex>
          {`<`}
          <TextPrimary>endoh.io</TextPrimary>
          {`/>`}
        </Flex>
      </Typography>
      <Box>
        {/* TODO: create a utils/SecondaryTxt */}
        <Typography variant="subtitle1">
          A <TextSecondary>web application suite</TextSecondary> where 
          I will be developing and hosting some solutions. They’re mostly{" "}
          <TextSecondary>self-awareness tools </TextSecondary>
          evolved from my obsession with <TextSecondary>spreadsheets </TextSecondary>
          and <TextSecondary>Likert scale</TextSecondary>.
        </Typography>
      </Box>
    </Box>
  );
};

export default LandingPageDescription;
