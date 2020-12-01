import { Box, CssBaseline, MuiThemeProvider } from "@material-ui/core";
import Navbar from "components/navbar/Navbar";
import Home from "pages/index/Home";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import { Dispatch } from "redux";
import { checkAuthOrLogoutActionCreator } from "store/auth/authActions";
import { ApplicationState } from "store/store";
import EnterApplication from "./pages/index/EnterApplication";
import LandingPage from "./pages/index/LandingPage";
import LoadingPage from "./pages/index/LoadingPage";
import SettingsNavbar from "./pages/settings/SettingsNavbar";
import SettingsPage from "./pages/settings/SettingsPage";
import MoneratePage from "./pages/Monerate/MoneratePage";
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

  const location = useLocation();

  // PE 2/3 - Not very scalable...
  let redirectTo = "/";
  if (location.pathname === "/monerate") {
    redirectTo = "/login?next=/monerate";
  }

  // PE 2/3 - routes = nome ruim?
  let routes = (
    <Switch>
      <Route path="/" exact component={LandingPage} />
      <Route path="/login" component={EnterApplication} />
      <Redirect to={redirectTo} />
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
            <Route path="/" component={Home} />
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
  ReturnType<typeof mapDispatchToProps>;

const mapStateToProps = (state: ApplicationState) => ({
  user: state.auth.user,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  checkAuthOrLogout: () => dispatch(checkAuthOrLogoutActionCreator(dispatch)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
