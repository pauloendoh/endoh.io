import { faFire } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AppBar, Box, Button, createStyles, makeStyles, Theme, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import FlexVCenter from '../shared/Flexboxes/FlexVCenter';
import ApplicationMenu from './SelectApplication/ApplicationMenu';
import UserMenu from './UserMenu';

// PE 2/3 
const Navbar = () => {
  const classes = useStyles();

  return (
    <AppBar className={classes.root} position="fixed" elevation={0} >
      <Toolbar>

        {/* PE 2/3 - Change into a subcomponent? <MyLogo/> */}
        <Button variant="text" href="/" className={classes.logoButton}>
          <Typography variant="h5">
            <FlexVCenter>
              <FontAwesomeIcon icon={faFire}  className={classes.fireIcon}/>
              <Box ml={1}>Endoh.io</Box>
            </FlexVCenter>
          </Typography>
        </Button>

        <Box ml={2}>
          {/*  PE 2/3 - rename to ApplicationMenu ? */}
          <ApplicationMenu />
        </Box>

        <Box ml="auto">
          <UserMenu />
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
      borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
    },
    logoButton: {
      "&:hover": {
        background: "transparent",
      },
    },
    fireIcon: {
      color: theme.palette.secondary.main
    }
  })
);

export default Navbar;
