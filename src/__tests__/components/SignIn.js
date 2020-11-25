import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import { SignInContainer } from '../components/SignIn';
// ...

describe('SignIn', () => {
  console.log(SignInContainer);

  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      // render the SignInContainer component, fill the text inputs and press the submit button
      const onSubmit = jest.fn();
      const { getByText, getByPlaceholderText } = render(
        <SignInContainer onSubmit={onSubmit} />
      );

      fireEvent.changeText(getByPlaceholderText('username'), 'kalle');
      fireEvent.changeText(getByPlaceholderText('password'), 'password');
      fireEvent.press(getByText('Log In'));

      await act(async () => {
        // call the fireEvent method here
      });

      await waitFor(() => {
        // expect the onSubmit function to have been called once and with a correct first argument
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit.mock.calls[0][0]).toEqaul({
          username: 'kalle',
          password: 'password'
        });
      });
    });
  });
});
