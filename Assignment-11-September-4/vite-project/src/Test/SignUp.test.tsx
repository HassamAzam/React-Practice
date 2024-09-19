import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { describe, it, expect, vi } from 'vitest';

import SignUp from 'src/Components/SignUp/SignUp';
import signUpReducer from 'src/store/signUpSlice';
import Status from 'src/Utilities/Enums';
import '@testing-library/jest-dom';

const store = configureStore({
  reducer: {
    signUp: signUpReducer,
  },
});

describe('SignUp Component', () => {
  it('should contain all form fields and a submit button', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SignUp />
        </MemoryRouter>
      </Provider>,
    );

    const firstNameInput = screen.getByLabelText(/First Name/i);
    expect(firstNameInput).toBeInTheDocument();

    const lastNameInput = screen.getByLabelText(/Last Name/i);
    expect(lastNameInput).toBeInTheDocument();

    const emailInput = screen.getByLabelText(/Email/i);
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute('type', 'email');

    const passwordInput = screen.getByLabelText(/Password/i);
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute('type', 'password');

    const maritalStatusSelect = screen.getByLabelText(/Marital Status/i);
    expect(maritalStatusSelect).toBeInTheDocument();

    const genderSelect = screen.getByLabelText(/Gender/i);
    expect(genderSelect).toBeInTheDocument();

    const submitButton = screen.getByRole('button', { name: /Sign Up/i });
    expect(submitButton).toBeInTheDocument();
  });

  it('should show success toast message on successful sign up', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SignUp />
        </MemoryRouter>
      </Provider>,
    );
    store.dispatch({
      type: 'signUp/setStatus',
      payload: Status.Success,
    });
    setTimeout(() => {
      expect(screen.getByText(/Signed Up!/i)).toBeInTheDocument();
    }, 3000);
  });

  it('should show error toast message on failed sign up', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SignUp />
        </MemoryRouter>
      </Provider>,
    );
    store.dispatch({
      type: 'signUp/setStatus',
      payload: Status.Failed,
    });
    setTimeout(() => {
      expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
    }, 3000);
  });

  it('should call navigate to login page on successful sign up', () => {
    const navigate = vi.fn();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SignUp />
        </MemoryRouter>
      </Provider>,
    );
    store.dispatch({
      type: 'signUp/setStatus',
      payload: Status.Success,
    });
    setTimeout(() => {
      expect(navigate).toHaveBeenCalledWith('/login');
    }, 3000);
  });
});
