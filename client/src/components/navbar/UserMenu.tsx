import { faCog, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Box } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import FlexVCenter from "components/shared/Flexboxes/FlexVCenter";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Dispatch } from "redux";
import { logoutActionCreator } from "../../store/auth/authActions";
import { ApplicationState } from "../../store/store";
// PE 2/3
const UserMenu = (props: Props) => {
  const location = useLocation();
  const [authUser, setAuthUser] = useState(props.authUser);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  let settingsHref = "/settings";
  if (location.pathname.startsWith("/monerate")) {
    settingsHref = "/settings/monerate/places";
  }

  return (
    <div>
      <Button
        className="user-email d-flex justify-content-between"
        onClick={handleClick}
        fullWidth
        aria-controls="simple-menu"
        aria-haspopup="true"
      >
        <FlexVCenter>
          {/* <Box mr={2}>{authUser.username}</Box> */}
          <Avatar alt={authUser.username} src={authUser.picture} />
        </FlexVCenter>
      </Button>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem component={Link} to={settingsHref}>
          <Box mr={2}>
            <FontAwesomeIcon icon={faCog} />
          </Box>
          Settings
        </MenuItem>

        <MenuItem className="logout-option" onClick={() => props.logout()}>
          <Box mr={2}>
            <FontAwesomeIcon icon={faSignOutAlt} />
          </Box>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  authUser: state.auth.user,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  logout: () => dispatch(logoutActionCreator(dispatch)),
});

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
