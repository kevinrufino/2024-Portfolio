import React from 'react';
import { renderHook, act } from '@testing-library/react';
import {
  LoadingProvider,
  useLoading,
  LOADING_ACTIONS,
} from './LoadingContext.js';

const wrapper = ({ children }) => <LoadingProvider>{children}</LoadingProvider>;

describe('LoadingContext', () => {
  describe('initial state', () => {
    test('progress starts at 0', () => {
      const { result } = renderHook(() => useLoading(), { wrapper });
      expect(result.current.progress).toBe(0);
    });

    test('total is 7', () => {
      const { result } = renderHook(() => useLoading(), { wrapper });
      expect(result.current.total).toBe(7);
    });

    test('isLoading starts true', () => {
      const { result } = renderHook(() => useLoading(), { wrapper });
      expect(result.current.isLoading).toBe(true);
    });

    test('loadedComponents starts empty', () => {
      const { result } = renderHook(() => useLoading(), { wrapper });
      expect(result.current.loadedComponents).toEqual([]);
    });
  });

  describe('incrementProgress', () => {
    test('increments progress by 1', () => {
      const { result } = renderHook(() => useLoading(), { wrapper });
      act(() => result.current.incrementProgress());
      expect(result.current.progress).toBe(1);
    });

    test('increments multiple times', () => {
      const { result } = renderHook(() => useLoading(), { wrapper });
      act(() => result.current.incrementProgress());
      act(() => result.current.incrementProgress());
      act(() => result.current.incrementProgress());
      expect(result.current.progress).toBe(3);
    });

    test('caps at total (does not exceed 7)', () => {
      const { result } = renderHook(() => useLoading(), { wrapper });
      for (let i = 0; i < 10; i++) {
        act(() => result.current.incrementProgress());
      }
      expect(result.current.progress).toBe(7);
    });
  });

  describe('setProgress', () => {
    test('sets progress to a specific value', () => {
      const { result } = renderHook(() => useLoading(), { wrapper });
      act(() => result.current.setProgress(4));
      expect(result.current.progress).toBe(4);
    });

    test('overwrites previous progress', () => {
      const { result } = renderHook(() => useLoading(), { wrapper });
      act(() => result.current.setProgress(6));
      act(() => result.current.setProgress(2));
      expect(result.current.progress).toBe(2);
    });
  });

  describe('setLoadingState', () => {
    test('sets isLoading to false', () => {
      const { result } = renderHook(() => useLoading(), { wrapper });
      act(() => result.current.setLoadingState(false));
      expect(result.current.isLoading).toBe(false);
    });

    test('sets isLoading back to true', () => {
      const { result } = renderHook(() => useLoading(), { wrapper });
      act(() => result.current.setLoadingState(false));
      act(() => result.current.setLoadingState(true));
      expect(result.current.isLoading).toBe(true);
    });
  });

  describe('resetLoading', () => {
    test('resets all state to initial values', () => {
      const { result } = renderHook(() => useLoading(), { wrapper });

      act(() => result.current.setProgress(5));
      act(() => result.current.setLoadingState(false));
      act(() => result.current.resetLoading());

      expect(result.current.progress).toBe(0);
      expect(result.current.isLoading).toBe(true);
      expect(result.current.loadedComponents).toEqual([]);
    });
  });

  describe('getProgressPercentage', () => {
    test('returns 0 at start', () => {
      const { result } = renderHook(() => useLoading(), { wrapper });
      expect(result.current.getProgressPercentage()).toBe(0);
    });

    test('returns 100 when complete', () => {
      const { result } = renderHook(() => useLoading(), { wrapper });
      act(() => result.current.setProgress(7));
      expect(result.current.getProgressPercentage()).toBe(100);
    });

    test('rounds to nearest integer', () => {
      // 1/7 ≈ 14.28 → 14
      const { result } = renderHook(() => useLoading(), { wrapper });
      act(() => result.current.incrementProgress());
      expect(result.current.getProgressPercentage()).toBe(14);
    });
  });

  describe('isComplete', () => {
    test('returns false when progress is 0', () => {
      const { result } = renderHook(() => useLoading(), { wrapper });
      expect(result.current.isComplete()).toBe(false);
    });

    test('returns false when progress is less than total', () => {
      const { result } = renderHook(() => useLoading(), { wrapper });
      act(() => result.current.setProgress(6));
      expect(result.current.isComplete()).toBe(false);
    });

    test('returns true when progress equals total', () => {
      const { result } = renderHook(() => useLoading(), { wrapper });
      act(() => result.current.setProgress(7));
      expect(result.current.isComplete()).toBe(true);
    });

    test('returns true when progress exceeds total via setProgress', () => {
      const { result } = renderHook(() => useLoading(), { wrapper });
      act(() => result.current.setProgress(10));
      expect(result.current.isComplete()).toBe(true);
    });
  });

  describe('useLoading', () => {
    test('throws when used outside LoadingProvider', () => {
      const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
      expect(() => renderHook(() => useLoading())).toThrow(
        'useLoading must be used within a LoadingProvider',
      );
      spy.mockRestore();
    });
  });

  describe('LOADING_ACTIONS', () => {
    test('exports expected action type constants', () => {
      expect(LOADING_ACTIONS.SET_PROGRESS).toBe('SET_PROGRESS');
      expect(LOADING_ACTIONS.INCREMENT_PROGRESS).toBe('INCREMENT_PROGRESS');
      expect(LOADING_ACTIONS.SET_LOADING_STATE).toBe('SET_LOADING_STATE');
      expect(LOADING_ACTIONS.RESET_LOADING).toBe('RESET_LOADING');
    });
  });
});
