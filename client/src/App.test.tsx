import { render, waitFor } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';
import store from 'store/store';
import App from "./App";

it("should show 'Endoh.io'", async () => {
  const dom = render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );

  await waitFor(() => dom.getByText('endoh.io')) 
});
