import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders portfolio application', () => {
  render(<App />);
  // The app should render without crashing
  expect(document.body).toBeInTheDocument();
});

test('renders loading screen initially', () => {
  render(<App />);
  // The app should show loading screen initially
  const loadingText = screen.getByText(/loading/i);
  expect(loadingText).toBeInTheDocument();
});

test('loading progress is displayed', () => {
  render(<App />);
  // Should show loading percentage
  const progressText = screen.getByText(/loading.*\d+%/i);
  expect(progressText).toBeInTheDocument();
});
