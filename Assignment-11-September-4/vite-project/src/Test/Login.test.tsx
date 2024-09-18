import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { describe, it, expect, vi } from 'vitest';

import Login from 'src/Components/Login/Login';
import authReducer from 'src/store/authSlice';
import Status from 'src/Utilities/Enums';
import '@testing-library/jest-dom';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

describe('Login Component', () => {
  it("should call navigate when 'Forget Password' button is clicked", () => {
    const navigate = vi.fn();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>,
    );
    const forgetPasswordButton = screen.getByText(/Forget Password/i);
    forgetPasswordButton.click();
    setTimeout(() => {
      expect(navigate).toHaveBeenCalledWith('/forgetPassword');
    }, 1000);
  });

  it("should call navigate when 'SignUp' button is clicked", () => {
    const navigate = vi.fn();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>,
    );
    const signUpButton = screen.getByText(/SignUp/i);
    signUpButton.click();
    setTimeout(() => {
      expect(navigate).toHaveBeenCalledWith('/signup');
    }, 1000);
  });

  it('should show success toast message on successful login', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>,
    );
    const { user } = store.getState().auth;
    store.dispatch({
      type: 'auth/setStatus',
      payload: Status.Success,
    });
    store.dispatch({
      type: 'auth/setUser',
      payload: { ...user },
    });
    setTimeout(() => {
      expect(expect(screen.getByText(/Logged In/i)).toBeInTheDocument());
    }, 3000);
  });

  it('should show error toast message on failed login', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>,
    );
    store.dispatch({
      type: 'auth/setStatus',
      payload: Status.Failed,
    });
    setTimeout(() => {
      expect(
        screen.getByText(/Email or Password is wrong/i),
      ).toBeInTheDocument();
    }, 3000);
  });
});
