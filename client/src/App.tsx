import { Box, CssBaseline, MuiThemeProvider } from "@material-ui/core";
import Navbar from "components/navbar/Navbar";
import PATHS from "consts/PATHS";
import Home from "pages/index/Home";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Redirect,
  Route,
  RouteComponentProps,
  Switch,
  useLocation,
  withRouter,
} from "react-router-dom";
import { Dispatch } from "redux";
import { checkAuthOrLogoutActionCreator } from "store/auth/authActions";
import { ApplicationState } from "store/store";
import LandingPage from "./pages/index/LandingPage";
import LoadingPage from "./pages/index/LoadingPage";
import MoneratePage from "./pages/Monerate/MoneratePage/MoneratePage";
import SettingsNavbar from "./pages/settings/SettingsNavbar";
import SettingsPage from "./pages/settings/SettingsPage";
import myTheme from "./utils/myTheme";

// PE 2/3
const App = (props: Props) => {
  // 0.1s is enough time to check for auth user
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    props.checkAuthOrLogout();

    setTimeout(() => {
      setIsLoading(false);
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(
    () => {
      // Redirect after login
      if (props.user) {
        const nextUrl = new URLSearchParams(location.search).get("next");
        if (nextUrl) {
          props.history.push(nextUrl);
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.user]
  );

  const location = useLocation();

  // PE 2/3 - Not very scalable...
  let redirectAfterLogout = "/";
  if (location.pathname.startsWith(PATHS.monerate.index)) {
    redirectAfterLogout = "/?next=/monerate";
  }

  // PE 2/3 - routes = nome ruim?
  let routes = (
    <Switch>
      <Route path="/" exact component={LandingPage} />
      {/* <Route path="/login" component={EnterApplication} /> */}
      <Redirect to={redirectAfterLogout} />
    </Switch>
  );

  // PE 2/3 - Talvez criar um <UserRoutes/> ?
  if (props.user) {
    routes = (
      <Box height="100%">
        {location.pathname.startsWith("/settings/") ? (
          <SettingsNavbar />
        ) : (
          <Navbar />
        )}

        <Box py={10}>
          <Switch>
            <Route path="/monerate" component={MoneratePage} />
            <Route path="/settings" component={SettingsPage} />

            <Route path="/" exact component={Home} />
            <Redirect to="/" />
          </Switch>
        </Box>
      </Box>
    );
  }

  return (
    <MuiThemeProvider theme={myTheme}>
      {/* What does this do? */}
      <CssBaseline />
      {isLoading ? <LoadingPage /> : routes}
    </MuiThemeProvider>
  );
};

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  RouteComponentProps<{}>;

const mapStateToProps = (state: ApplicationState) => ({
  user: state.auth.user,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  checkAuthOrLogout: () => dispatch(checkAuthOrLogoutActionCreator(dispatch)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
