import { render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";
import ApplicationMenu from "./ApplicationMenu";

it("should render home + icon'", async () => {
  const history = createMemoryHistory();
  history.push("/");

  const dom = render(
    <Router history={history}>
      <ApplicationMenu />
    </Router>
  );

  dom.getAllByText('Home')
  dom.getByTestId('icon/')
});
