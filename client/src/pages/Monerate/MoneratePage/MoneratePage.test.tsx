import { fireEvent, render, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";
import React from "react";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import store from "store/store";
import MoneratePage from "./MoneratePage";

describe("<MoneratePage/>", () => {
  it("should render 'New Expense' button and expense filters", async () => {
    const history = createMemoryHistory();
    history.push("/monerate");

    const dom = render(
      <Provider store={store}>
        <Router history={history}>
          <MoneratePage />
        </Router>
      </Provider>
    );

    dom.getAllByText(/new expense/i);
    dom.getAllByText(/filters/i);
  });

  it("should open modal after clicking on 'new expense' button", async () =>{
    const history = createMemoryHistory();
    history.push("/monerate");

    const dom = render(
      <Provider store={store}>
        <Router history={history}>
          <MoneratePage />
        </Router>
      </Provider>
    );

    fireEvent.click(dom.getByTestId('new-expense-button'))
    await waitFor(() => dom.getByTestId('edit-expense-modal'))
  })
});
