import React from 'react';
import { render, screen } from '@testing-library/react';
import LoginScene from './LoginScene';

test('renders learn react link', () => {
  render(<LoginScene />);
  const linkElement = screen.getByText(/se connecter/i);
  expect(linkElement).toBeInTheDocument();
});
