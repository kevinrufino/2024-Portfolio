import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LoadingScreen from './LoadingScreen';

jest.mock('./Hero/HeroName.js', () => ({
  HeroName: ({ primaryColor, secondaryColor }) => (
    <div
      data-testid="hero-name"
      data-primary={primaryColor}
      data-secondary={secondaryColor}
    />
  ),
}));

const defaultProps = {
  progress: 0,
  total: 10,
  secondaryColor: '#3e3bf4',
  setCursor: jest.fn(),
};

const renderComponent = (props = {}) =>
  render(<LoadingScreen {...defaultProps} {...props} />);

describe('LoadingScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('percentage display', () => {
    test('shows 0% when progress is 0', () => {
      renderComponent({ progress: 0, total: 10 });
      expect(screen.getByText('Loading... 0%')).toBeInTheDocument();
    });

    test('shows 50% at half progress', () => {
      renderComponent({ progress: 5, total: 10 });
      expect(screen.getByText('Loading... 50%')).toBeInTheDocument();
    });

    test('shows 100% when complete', () => {
      renderComponent({ progress: 10, total: 10 });
      expect(screen.getByText('Loading... 100%')).toBeInTheDocument();
    });

    test('rounds percentage to nearest integer', () => {
      // 1/7 ≈ 14.28% → rounds to 14%
      renderComponent({ progress: 1, total: 7 });
      expect(screen.getByText('Loading... 14%')).toBeInTheDocument();
    });
  });

  describe('progress bar', () => {
    test('has 0% height at zero progress', () => {
      const { container } = renderComponent({ progress: 0, total: 10 });
      const bar = container.querySelector('.bg-\\[\\#3e3bf4\\]');
      expect(bar).toHaveStyle({ height: '0%' });
    });

    test('has 50% height at half progress', () => {
      const { container } = renderComponent({ progress: 5, total: 10 });
      const bar = container.querySelector('.bg-\\[\\#3e3bf4\\]');
      expect(bar).toHaveStyle({ height: '50%' });
    });

    test('has 100% height when complete', () => {
      const { container } = renderComponent({ progress: 10, total: 10 });
      const bar = container.querySelector('.bg-\\[\\#3e3bf4\\]');
      expect(bar).toHaveStyle({ height: '100%' });
    });
  });

  describe('HeroName', () => {
    test('renders with transparent primary color for mask effect', () => {
      renderComponent();
      expect(screen.getByTestId('hero-name')).toHaveAttribute(
        'data-primary',
        '#00000000',
      );
    });

    test('passes secondaryColor to HeroName', () => {
      renderComponent({ secondaryColor: '#FF0000' });
      expect(screen.getByTestId('hero-name')).toHaveAttribute(
        'data-secondary',
        '#FF0000',
      );
    });
  });

  describe('cursor interaction', () => {
    test('calls setCursor with empty string on mouse enter', () => {
      const setCursor = jest.fn();
      const { container } = renderComponent({ setCursor });
      fireEvent.mouseEnter(container.firstChild);
      expect(setCursor).toHaveBeenCalledWith('');
      expect(setCursor).toHaveBeenCalledTimes(1);
    });
  });
});
