import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { describe, it, expect, vi } from 'vitest';
import Login from 'src/Components/Login/Login';
import Status from 'src/Utilities/Enums';
import '@testing-library/jest-dom';

const mockStore = configureMockStore();
const initialState = {
  auth: {
    user: null,
    status: Status.Idle,
  },
};

describe('Login Component', () => {
  it("should call navigate when 'Forget Password' button is clicked", () => {
    const navigate = vi.fn();
    const store = mockStore(initialState);
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
    const store = mockStore(initialState);
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
    const store = mockStore({
      auth: {
        user: { name: 'Test User' },
        status: Status.Success,
      },
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>,
    );

    setTimeout(() => {
      expect(screen.getByText(/Logged In/i)).toBeInTheDocument();
    }, 3000);
  });

  it('should show error toast message on failed login', () => {
    const store = mockStore({
      auth: {
        user: null,
        status: Status.Failed,
      },
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>,
    );

    setTimeout(() => {
      expect(
        screen.getByText(/Email or Password is wrong/i),
      ).toBeInTheDocument();
    }, 3000);
  });
});
