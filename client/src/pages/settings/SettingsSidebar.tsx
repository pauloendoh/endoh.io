import { faFunnelDollar, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Box,
  Collapse,
  createStyles,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Theme,
  Toolbar,
} from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect, useLocation } from "react-router-dom";
import { Dispatch } from "redux";
import PATHS from "../../consts/PATHS";
import { logoutActionCreator } from "../../store/auth/authActions";
import { ApplicationState } from "../../store/store";

function SettingsSidebar(props: Props) {
  const classes = useStyles();

  const location = useLocation();
  const pathName = location.pathname;

  const [openEndoh, setOpenEndoh] = useState(false);
  const handleClickEndoh = () => {
    setOpenEndoh(!openEndoh);
  };

  const [openMonerate, setOpenMonerate] = useState(
    pathName.startsWith(PATHS.settings.monerate.index)
  );
  const handleClickMonerate = () => {
    setOpenMonerate(!openMonerate);
  };

  const [redirectTo, setRedirectTo] = useState("");
  const handleClickSubmenu = (href: string) => {
    setRedirectTo(href);
  };

  return (
    <Drawer
      className={classes.root}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar />
      <Box className={classes.drawerContainer}>
        <List>
          {/* <ListItem button onClick={handleClickEndoh}>
            <ListItemIcon>
              <FontAwesomeIcon icon={faUserAlt} />
            </ListItemIcon>
            <ListItemText primary="endoh.io" />
            {openEndoh ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openEndoh} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemText primary="Account" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemText primary="General" />
              </ListItem>
            </List>
          </Collapse> */}

          <ListItem button onClick={handleClickMonerate}>
            <ListItemIcon>
              <FontAwesomeIcon icon={faFunnelDollar} />
            </ListItemIcon>
            <ListItemText primary="Monerate" />
            {openMonerate ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openMonerate} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                className={classes.nested}
                selected={pathName.startsWith(PATHS.settings.monerate.places)}
                onClick={() =>
                  handleClickSubmenu(PATHS.settings.monerate.places)
                }
              >
                <ListItemText primary="Places" />
              </ListItem>
              <ListItem
                button
                className={classes.nested}
                selected={pathName.startsWith(
                  PATHS.settings.monerate.categories
                )}
                onClick={() =>
                  handleClickSubmenu(PATHS.settings.monerate.categories)
                }
              >
                <ListItemText primary="Categories" />
              </ListItem>
            </List>
          </Collapse>
        </List>
      </Box>
      {redirectTo.length ? <Redirect to={redirectTo} /> : null}
    </Drawer>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 200,
      flexShrink: 0,
    },

    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },

    drawerPaper: {
      width: 200,
      background: "#202020",
      borderRight: "1px solid rgba(255, 255, 255, 0.05)",
    },
    drawerContainer: {
      // overflow: "auto",
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  })
);

const mapStateToProps = (state: ApplicationState) => ({
  user: state.auth.user,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  logout: () => dispatch(logoutActionCreator(dispatch)),
});

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(SettingsSidebar);
