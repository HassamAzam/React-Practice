import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import { describe, it, expect } from "vitest";

import Login from "../Components/Login/Login";
import authReducer from "src/store/authSlice";

import "@testing-library/jest-dom";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

describe("Login Component", () => {
  it("should contain three buttons", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(3);
    expect(buttons[0]).toHaveTextContent("Login");
    expect(buttons[1]).toHaveTextContent("Forget Password");
    expect(buttons[2]).toHaveTextContent("SignUp");
  });

  it("should contain email and password input fields", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );
    const emailInput = screen.getByLabelText(/Email/i);
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute("type", "email");

    const passwordInput = screen.getByLabelText(/Password/i);
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute("type", "password");
  });
});
