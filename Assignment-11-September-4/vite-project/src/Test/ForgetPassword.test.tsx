import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import "@testing-library/jest-dom";

import { describe, it, expect } from "vitest";

import ForgetPassword from "../Components/Login/ForgetPassword";
import codeReducer from "src/store/loginThroughCodeSlice";

const store = configureStore({
  reducer: {
    code: codeReducer,
  },
});

describe("ForgetPassword Component", () => {
  it("should contain a button and an email input field", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ForgetPassword />
        </MemoryRouter>
      </Provider>
    );
    const emailInput = screen.getByLabelText(/Email/i);
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute("type", "email");

    const submitButton = screen.getByRole("button", { name: /Send Details/i });
    expect(submitButton).toBeInTheDocument();
  });
});
