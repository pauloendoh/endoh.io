import { Box, Button, Container, Typography } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React, { useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import FooterDescription from "../../components/descriptions/FooterDescription";
import LandingPageDescription from "../../components/descriptions/LandingPageDescription";
import MonerateDescription from "../../components/descriptions/MonerateDescription";
import AuthForm from "./AuthForm";

const LandingPage = () => {
  useEffect(()=> {
    document.title = 'Endoh.io'
  }, [])
  return (
    <Box>
      <Container maxWidth="md">
        <Box display="flex" justifyContent="space-between" mt="7.5em">
          <Box mt={5}>
            <LandingPageDescription />
          </Box>
          {/* TODO: create <AuthForm/> */}
          <Box ml={4}>
            <AuthForm/>
          </Box>
        </Box>
        <Box mt={20} textAlign="center">
          <ScrollLink
            to="monerate-description"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
          >
            <Button variant="text">
              <Box display="flex" flexDirection="column">
                <Typography variant="h4">Check applications</Typography>
                <Box>
                  <ExpandMoreIcon />
                </Box>
              </Box>
            </Button>
          </ScrollLink>
        </Box>
        <Box mt={10}>
          <MonerateDescription />
        </Box>
        <Box mt={15}>
          <FooterDescription mb={10} />
        </Box>
      </Container>
    </Box>
  );
};

export default LandingPage;
