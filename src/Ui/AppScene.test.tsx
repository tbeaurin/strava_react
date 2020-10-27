import React from 'react';
import { render, screen } from '@testing-library/react';
import AppScene from './AppScene';

test('renders learn react link', () => {
  render(<AppScene />);
  const linkElement = screen.getByText(/se connecter/i);
  expect(linkElement).toBeInTheDocument();
});
