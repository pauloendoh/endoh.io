import { Box, Container } from "@material-ui/core";
import MonerateDescription from "components/descriptions/MonerateDescription";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import AuthForm from "./AuthForm";

const EnterApplication = () => {
  const location = useLocation();
  const next = new URLSearchParams(location.search).get("next");

  useEffect(() => {
    document.title = 'Endoh.io - Login'
  }, 
  []);

  return (
    <Box>
      <Container maxWidth="md">
        <Box display="flex" justifyContent="space-between" mt="7.5em">
          <Box mt={5}>
            {next === "/monerate" ? <MonerateDescription /> : null}
          </Box>
          <Box ml={4}>
            <AuthForm />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default EnterApplication;
