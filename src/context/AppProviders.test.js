import React from 'react';
import { render, screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react';
import AppProviders from './AppProviders.js';
import { useCursor } from './CursorContext.js';
import { useTheme } from './ThemeContext.js';
import { useLoading } from './LoadingContext.js';

const wrapper = ({ children }) => <AppProviders>{children}</AppProviders>;

describe('AppProviders', () => {
  test('renders children', () => {
    render(
      <AppProviders>
        <div data-testid="child">hello</div>
      </AppProviders>,
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  test('provides CursorContext to children', () => {
    const { result } = renderHook(() => useCursor(), { wrapper });
    expect(result.current).not.toBeNull();
    expect(result.current.type).toBe('default');
  });

  test('provides ThemeContext to children', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });
    expect(result.current).not.toBeNull();
    expect(result.current.currentTheme).toBeDefined();
  });

  test('provides LoadingContext to children', () => {
    const { result } = renderHook(() => useLoading(), { wrapper });
    expect(result.current).not.toBeNull();
    expect(result.current.progress).toBe(0);
  });
});
