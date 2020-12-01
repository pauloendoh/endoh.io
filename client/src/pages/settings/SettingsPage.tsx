import { Box } from "@material-ui/core";
import Flex from "components/shared/Flexboxes/Flex";
import PATHS from "consts/PATHS";
import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import PlaceSettings from "./MonerateSettings/PlaceSettings";
import SettingsSidebar from "./SettingsSidebar";
import CategorySettings from "./MonerateSettings/CategorySettings";

function SettingsPage() {
  useEffect(() => {
    document.title = "Settings";
  }, []);

  return (
    <Flex height="100%">
      <SettingsSidebar />
      <Box pt={1} pl={4} flexGrow={1}>
        <Switch>
          <Route
            path={PATHS.settings.monerate.places}
            component={PlaceSettings}
          />
          <Route
            path={PATHS.settings.monerate.categories}
            component={CategorySettings}
          />

          <Route path="/" render={() => <Box>xd</Box>} />
        </Switch>
      </Box>
    </Flex>
  );
}

export default SettingsPage;
