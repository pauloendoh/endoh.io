import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  AppBar,
  Box,
  Button,
  createStyles,
  makeStyles,
  Theme,
  Toolbar,
  Typography,
} from "@material-ui/core";
import Flex from "components/shared/Flexboxes/Flex";
import FlexVCenter from 'components/shared/Flexboxes/FlexVCenter';
import React from "react";
import { Link, useLocation } from "react-router-dom";

const SettingsNavbar = () => {
  const classes = useStyles();
  const location = useLocation();

  const next = new URLSearchParams(location.search).get("next");

  return (
    <AppBar className={classes.root} position="fixed" elevation={0}>
      <Toolbar>
        <Typography variant="h5">Settings</Typography>
        <Box ml="auto">
          <Link
            to={next?.length ? next : "/"}
            style={{ textDecoration: "none" }}
          >
            <Button>
              <FlexVCenter>
                <FontAwesomeIcon icon={faTimes} size="lg" />
                <Box ml={1}>
                  <Typography variant="h6">Close</Typography>
                </Box>
              </FlexVCenter>
            </Button>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      background: "#202020",
      zIndex: theme.zIndex.drawer + 1,
      borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
    },
  })
);

export default SettingsNavbar;
