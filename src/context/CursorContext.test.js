import React from 'react';
import { renderHook, act } from '@testing-library/react';
import {
  CursorProvider,
  useCursor,
  CURSOR_ACTIONS,
} from './CursorContext.js';

const wrapper = ({ children }) => <CursorProvider>{children}</CursorProvider>;

describe('CursorContext', () => {
  describe('initial state', () => {
    test('type defaults to "default"', () => {
      const { result } = renderHook(() => useCursor(), { wrapper });
      expect(result.current.type).toBe('default');
    });

    test('position defaults to {x:0, y:0}', () => {
      const { result } = renderHook(() => useCursor(), { wrapper });
      expect(result.current.position).toEqual({ x: 0, y: 0 });
    });

    test('isVisible defaults to true', () => {
      const { result } = renderHook(() => useCursor(), { wrapper });
      expect(result.current.isVisible).toBe(true);
    });
  });

  describe('setCursorType', () => {
    test('updates cursor type', () => {
      const { result } = renderHook(() => useCursor(), { wrapper });
      act(() => result.current.setCursorType('hover'));
      expect(result.current.type).toBe('hover');
    });

    test('sets type to empty string', () => {
      const { result } = renderHook(() => useCursor(), { wrapper });
      act(() => result.current.setCursorType('hover'));
      act(() => result.current.setCursorType(''));
      expect(result.current.type).toBe('');
    });
  });

  describe('setPosition', () => {
    test('updates cursor position', () => {
      const { result } = renderHook(() => useCursor(), { wrapper });
      act(() => result.current.setPosition({ x: 100, y: 200 }));
      expect(result.current.position).toEqual({ x: 100, y: 200 });
    });
  });

  describe('resetCursor', () => {
    test('resets type and position to initial values', () => {
      const { result } = renderHook(() => useCursor(), { wrapper });

      act(() => result.current.setCursorType('hover'));
      act(() => result.current.setPosition({ x: 50, y: 75 }));
      act(() => result.current.resetCursor());

      expect(result.current.type).toBe('default');
      expect(result.current.position).toEqual({ x: 0, y: 0 });
    });
  });

  describe('useCursor', () => {
    test('throws when used outside CursorProvider', () => {
      const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
      expect(() => renderHook(() => useCursor())).toThrow(
        'useCursor must be used within a CursorProvider',
      );
      spy.mockRestore();
    });
  });

  describe('CURSOR_ACTIONS', () => {
    test('exports expected action type constants', () => {
      expect(CURSOR_ACTIONS.SET_CURSOR_TYPE).toBe('SET_CURSOR_TYPE');
      expect(CURSOR_ACTIONS.SET_POSITION).toBe('SET_POSITION');
      expect(CURSOR_ACTIONS.RESET_CURSOR).toBe('RESET_CURSOR');
    });
  });
});
