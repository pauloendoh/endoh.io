import { fireEvent, render, waitFor } from "@testing-library/react";
import { assert } from 'console';
import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";
import ApplicationMenu from "./ApplicationMenu";

describe("<ApplicationMenu/>", () => {
  it("should render home + icon'", async () => {
    const history = createMemoryHistory();
    history.push("/");

    const dom = render(
      <Router history={history}>
        <ApplicationMenu />
      </Router>
    );

    dom.getAllByText("Home");
    dom.getByTestId("icon/");
  });

  it("should change path to /monerate when clicking Monerate option", async () => {
    const history = createMemoryHistory();
    history.push("/");

    const dom = render(
      <Router history={history}>
        <ApplicationMenu />
      </Router>
    );

    fireEvent.click(dom.getByTestId('application-menu-button'))
    await waitFor(() =>  dom.getByText('Monerate'))

    fireEvent.click(dom.getByText('Monerate'))
    await waitFor(() => assert(history.location.pathname === '/monerate') )
  });
});
