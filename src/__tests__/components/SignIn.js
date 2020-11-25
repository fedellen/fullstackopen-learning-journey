import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import SignInContainer from '../../components/SignIn/SignInContainer';

/* 
// To use Formik forms, use 
// `await act(async () => await fireEvent.things)`
// Just as below's example 😂
*/

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      // render the SignInContainer component, fill the text inputs and press the submit button
      const onSubmit = jest.fn();
      const { getByText, getByPlaceholderText } = render(
        <SignInContainer onSubmit={onSubmit} />
      );

      await act(async () => {
        await fireEvent.changeText(getByPlaceholderText('username'), 'kalle');
        await fireEvent.changeText(
          getByPlaceholderText('password'),
          'password'
        );
        await fireEvent.press(getByText('Log In'));
      });

      await waitFor(() => {
        // expect the onSubmit function to have been called once and with a correct first argument
        expect(onSubmit).toHaveBeenCalledTimes(1);
      });
      expect(onSubmit.mock.calls[0][0]).toStrictEqual({
        username: 'kalle',
        password: 'password'
      });
    });
  });
});
