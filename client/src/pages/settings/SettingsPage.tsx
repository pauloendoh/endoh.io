import { Box } from "@material-ui/core";
import Flex from "components/shared/Flexboxes/Flex";
import PATHS from "consts/PATHS";
import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import PlaceSettings from "./MonerateSettings/PlaceSettings";
import SettingsSidebar from "./SettingsSidebar";
import CategorySettings from "./MonerateSettings/CategorySettings";
import EditPlaceModal from "pages/Monerate/Modals/EditPlaceModal";
import EditCategoryModal from "pages/Monerate/Modals/EditCategoryModal";

function SettingsPage() {
  useEffect(() => {
    document.title = "Settings";
  }, []);

  return (
    <Flex height="100%">
      <SettingsSidebar />
      <Box pt={1} px={4} flexGrow={1}>
        <Switch>
          <Route
            path={PATHS.settings.monerate.places}
            component={PlaceSettings}
          />
          <Route
            path={PATHS.settings.monerate.categories}
            component={CategorySettings}
          />

          {/* por hora, redirecionar para o settings/monerate/places */}
          <Route
            path="/"
            render={() => <Redirect to={PATHS.settings.monerate.places} />}
          />
        </Switch>
      </Box>

      <EditPlaceModal />
      <EditCategoryModal />
    </Flex>
  );
}

export default SettingsPage;
