import React from 'react';
import { renderHook, act } from '@testing-library/react';
import {
  ThemeProvider,
  useTheme,
  THEMES,
  THEME_ACTIONS,
} from './ThemeContext.js';

const wrapper = ({ children }) => <ThemeProvider>{children}</ThemeProvider>;

describe('ThemeContext', () => {
  describe('initial state', () => {
    test('starts with YELLOW_BLUE theme', () => {
      const { result } = renderHook(() => useTheme(), { wrapper });
      expect(result.current.currentTheme).toEqual(THEMES.YELLOW_BLUE);
    });

    test('isDarkMode defaults to false', () => {
      const { result } = renderHook(() => useTheme(), { wrapper });
      expect(result.current.isDarkMode).toBe(false);
    });
  });

  describe('getThemeColors', () => {
    test('returns current theme colors', () => {
      const { result } = renderHook(() => useTheme(), { wrapper });
      expect(result.current.getThemeColors()).toEqual(THEMES.YELLOW_BLUE);
    });

    test('returns updated colors after theme change', () => {
      const { result } = renderHook(() => useTheme(), { wrapper });
      act(() => result.current.setTheme(THEMES.BLUE_YELLOW));
      expect(result.current.getThemeColors()).toEqual(THEMES.BLUE_YELLOW);
    });
  });

  describe('setTheme', () => {
    test('sets theme to BLUE_YELLOW', () => {
      const { result } = renderHook(() => useTheme(), { wrapper });
      act(() => result.current.setTheme(THEMES.BLUE_YELLOW));
      expect(result.current.currentTheme).toEqual(THEMES.BLUE_YELLOW);
    });

    test('sets theme back to YELLOW_BLUE', () => {
      const { result } = renderHook(() => useTheme(), { wrapper });
      act(() => result.current.setTheme(THEMES.BLUE_YELLOW));
      act(() => result.current.setTheme(THEMES.YELLOW_BLUE));
      expect(result.current.currentTheme).toEqual(THEMES.YELLOW_BLUE);
    });
  });

  describe('toggleTheme', () => {
    test('switches from YELLOW_BLUE to BLUE_YELLOW', () => {
      const { result } = renderHook(() => useTheme(), { wrapper });
      act(() => result.current.toggleTheme());
      expect(result.current.currentTheme).toEqual(THEMES.BLUE_YELLOW);
    });

    test('switches back to YELLOW_BLUE on second toggle', () => {
      const { result } = renderHook(() => useTheme(), { wrapper });
      act(() => result.current.toggleTheme());
      act(() => result.current.toggleTheme());
      expect(result.current.currentTheme).toEqual(THEMES.YELLOW_BLUE);
    });

    test('toggles isDarkMode', () => {
      const { result } = renderHook(() => useTheme(), { wrapper });
      act(() => result.current.toggleTheme());
      expect(result.current.isDarkMode).toBe(true);
      act(() => result.current.toggleTheme());
      expect(result.current.isDarkMode).toBe(false);
    });
  });

  describe('THEMES', () => {
    test('YELLOW_BLUE has correct colors', () => {
      expect(THEMES.YELLOW_BLUE.primary).toBe('#F1F43B');
      expect(THEMES.YELLOW_BLUE.secondary).toBe('#3e3bf4');
    });

    test('BLUE_YELLOW has correct colors', () => {
      expect(THEMES.BLUE_YELLOW.primary).toBe('#3e3bf4');
      expect(THEMES.BLUE_YELLOW.secondary).toBe('#F1F43B');
    });

    test('themes are inverses of each other', () => {
      expect(THEMES.YELLOW_BLUE.primary).toBe(THEMES.BLUE_YELLOW.secondary);
      expect(THEMES.YELLOW_BLUE.secondary).toBe(THEMES.BLUE_YELLOW.primary);
    });
  });

  describe('useTheme', () => {
    test('throws when used outside ThemeProvider', () => {
      const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
      expect(() => renderHook(() => useTheme())).toThrow(
        'useTheme must be used within a ThemeProvider',
      );
      spy.mockRestore();
    });
  });

  describe('THEME_ACTIONS', () => {
    test('exports expected action type constants', () => {
      expect(THEME_ACTIONS.SET_THEME).toBe('SET_THEME');
      expect(THEME_ACTIONS.TOGGLE_THEME).toBe('TOGGLE_THEME');
    });
  });
});
