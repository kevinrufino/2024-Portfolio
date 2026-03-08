/**
 * Cursor Context for managing cursor state and interactions
 *
 * Provides global cursor state management without prop drilling
 * Supports cursor type changes and position tracking
 *
 * @context
 */

import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
} from 'react';
import PropTypes from 'prop-types';

// Action types for cursor state management
export const CURSOR_ACTIONS = {
  SET_CURSOR_TYPE: 'SET_CURSOR_TYPE',
  SET_POSITION: 'SET_POSITION',
  RESET_CURSOR: 'RESET_CURSOR',
};

// Initial cursor state
const initialState = {
  type: 'default',
  position: { x: 0, y: 0 },
  isVisible: true,
};

// Reducer for cursor state management
const cursorReducer = (state, action) => {
  switch (action.type) {
    case CURSOR_ACTIONS.SET_CURSOR_TYPE:
      return {
        ...state,
        type: action.payload,
      };
    case CURSOR_ACTIONS.SET_POSITION:
      return {
        ...state,
        position: action.payload,
      };
    case CURSOR_ACTIONS.RESET_CURSOR:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

// Create context
const CursorContext = createContext(null);

// Context provider component
export const CursorProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cursorReducer, initialState);

  // Action creators with useCallback to prevent infinite re-renders
  const setCursorType = useCallback(type => {
    dispatch({ type: CURSOR_ACTIONS.SET_CURSOR_TYPE, payload: type });
  }, []);

  const setPosition = useCallback(position => {
    dispatch({ type: CURSOR_ACTIONS.SET_POSITION, payload: position });
  }, []);

  const resetCursor = useCallback(() => {
    dispatch({ type: CURSOR_ACTIONS.RESET_CURSOR });
  }, []);

  const value = {
    ...state,
    setCursorType,
    setPosition,
    resetCursor,
  };

  return (
    <CursorContext.Provider value={value}>{children}</CursorContext.Provider>
  );
};

// Custom hook for using cursor context
export const useCursor = () => {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error('useCursor must be used within a CursorProvider');
  }
  return context;
};

CursorProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CursorContext;
