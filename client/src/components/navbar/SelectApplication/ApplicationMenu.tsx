import { faSortDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, Menu, Typography } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import FlexVCenter from "components/shared/Flexboxes/FlexVCenter";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  applicationOptions,
  getCurrentApplicationByPath,
  IApplicationOption,
} from "./ApplicationOptions";

// PE 3/3
const ApplicationMenu = () => {
  const location = useLocation();

  const [currentApplication, setCurrentApplication] = useState<
    IApplicationOption
  >(getCurrentApplicationByPath(""));

  useEffect(() => {
    const pathName = location.pathname;
    setCurrentApplication(getCurrentApplicationByPath(pathName));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Button
        onClick={handleClick}
        fullWidth
        aria-controls="simple-menu"
        aria-haspopup="true"
        data-testid="application-menu-button"
      >
        <FlexVCenter>
          <FontAwesomeIcon icon={currentApplication.faIcon} />
          <Box ml={1} mr={2}>
            <Typography variant="body1">
              {currentApplication.applicationName}
            </Typography>
          </Box>
          <Box mb="5px">
            <FontAwesomeIcon icon={faSortDown} />
          </Box>
        </FlexVCenter>
      </Button>
      <Menu
        id="application-menu"
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {applicationOptions.map((option) => (
          <MenuItem
            key={option.path}
            component={Link}
            to={option.path}
            onClick={handleClose}
          >
            <Box display="flex" alignItems="center">
              <FontAwesomeIcon
                icon={option.faIcon}
                data-testid={"icon" + option.path}
              />
              <Box ml={1}>{option.applicationName}</Box>
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default ApplicationMenu;
