/**
 * Refactored App component using new architecture
 *
 * Demonstrates the improved architecture with:
 * - Context providers for global state
 * - Custom hooks for better state management
 * - Separated concerns and responsibilities
 * - Better performance and maintainability
 *
 * @component
 * @returns {JSX.Element} The rendered application
 */

import React, { useEffect } from 'react';
import AppProviders from './context/AppProviders.js';
import { useCursor } from './context/CursorContext.js';
import { useTheme } from './context/ThemeContext.js';
import { useLoading } from './context/LoadingContext.js';
import LoadingScreen from './components/LoadingScreen.js';
import { Footer } from './components/Footer.js';
import { Intro } from './components/Intro/Intro.js';
import { NavBar } from './components/Nav.js';
import { Projects } from './components/Projects/Projects.js';
import { SkillsMarquee } from './components/Intro/SkillsMarquee.js';
import Cursor from './components/Cursor.js';
import { Hero } from './components/Hero/Hero.js';
import { preloadImages } from './services/AssetService.js';
import MikaShaderEffect from './components/ShaderBackground/index.js';

/**
 * Inner App component that uses context hooks
 *
 * This component uses the context hooks and is wrapped by AppProviders
 */
const AppContent = () => {
  // Use context hooks instead of local state
  const { setCursorType, type: cursorType } = useCursor();
  const { getThemeColors } = useTheme();
  const { incrementProgress, getProgressPercentage, isComplete } = useLoading();

  // Preload critical assets
  useEffect(() => {
    const criticalAssets = [
      // Add critical image paths here
    ];

    if (criticalAssets.length > 0) {
      preloadImages(criticalAssets);
    }
  }, []);

  // Handle loading progression
  useEffect(() => {
    const loadingInterval = setInterval(() => {
      if (!isComplete()) {
        incrementProgress();
      } else {
        clearInterval(loadingInterval);
      }
    }, 350);

    return () => clearInterval(loadingInterval);
  }, [incrementProgress, isComplete]);

  // Handle cursor reset on app load
  useEffect(() => {
    setCursorType('');
  }, [setCursorType]);

  // Get theme colors
  const themeColors = getThemeColors();

  if (!isComplete()) {
    return (
      <LoadingScreen
        progress={getProgressPercentage()}
        total={100}
        secondaryColor={themeColors.secondary}
        setCursor={setCursorType}
      />
    );
  }

  return (
    <div
      className={`text-[${themeColors.secondary}] scroll-smooth relative overflow-hidden`}
      style={{ zIndex: 1 }}
    >
      {/* Shader Background */}
      <MikaShaderEffect />

      {/* Hidden easter egg text */}
      <p style={{ color: themeColors.primary }}>
        {`if you're reading this, you found a secret ;p`}
      </p>

      {/* Global cursor component */}
      <Cursor cursor={cursorType} />

      {/* Navigation header */}
      <NavBar setCursor={setCursorType} />

      {/* Hero section */}
      <Hero
        primaryColor={themeColors.primary}
        secondaryColor={themeColors.secondary}
        setCursor={setCursorType}
      />

      {/* Introduction section */}
      <Intro
        secondaryColor={themeColors.secondary}
        cursor={''}
        setCursor={setCursorType}
      />

      {/* Skills marquee */}
      <SkillsMarquee loop={0} />

      {/* Projects showcase */}
      <Projects cursor={''} setCursor={setCursorType} />

      {/* Footer section */}
      <Footer cursor={''} setCursor={setCursorType} />
    </div>
  );
};

/**
 * Refactored App component
 *
 * Uses context providers instead of prop drilling
 * Implements proper separation of concerns
 * Better performance with optimized re-renders
 */
const AppRefactored = () => {
  return (
    <AppProviders>
      <AppContent />
    </AppProviders>
  );
};

export default AppRefactored;
