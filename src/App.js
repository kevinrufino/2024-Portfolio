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

import React, { useEffect, Suspense } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
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
import MatterJSCanvas from './components/Hero/MatterJSCanvas.js';
import ProjectPage from './pages/ProjectPage.js';
import PageTransition from './components/PageTransition.js';
import Reveal from './components/Reveal.js';

const MikaShaderEffect = React.lazy(
  () => import('./components/ShaderBackground/index.js'),
);

/**
 * Inner App component that uses context hooks
 *
 * This component uses the context hooks and is wrapped by AppProviders
 */
const AppContent = () => {
  // Use context hooks instead of local state
  const { setCursorType, type: cursorType } = useCursor();
  const { getThemeColors } = useTheme();
  const { setProgress, getProgressPercentage, isComplete, setLoadingComplete } =
    useLoading();

  // Preload critical assets
  useEffect(() => {
    const criticalAssets = [
      // Add critical image paths here
    ];

    if (criticalAssets.length > 0) {
      preloadImages(criticalAssets);
    }
  }, []);

  // Complete loading when fonts are ready, with a 600ms minimum for the animation
  useEffect(() => {
    const MIN_MS = 600;
    const start = Date.now();
    document.fonts.ready.then(() => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, MIN_MS - elapsed);
      setTimeout(() => {
        setProgress(7);
        setTimeout(() => setLoadingComplete(), 300);
      }, remaining);
    });
  }, [setProgress, setLoadingComplete]);

  // Handle cursor reset on app load
  useEffect(() => {
    setCursorType('');
  }, [setCursorType]);

  // Scroll to the hash target after SPA navigation (e.g. "← INDEX" → /#projects)
  const { hash } = useLocation();
  useEffect(() => {
    if (!hash) return;
    const el = document.querySelector(hash);
    if (el) {
      const id = setTimeout(() => el.scrollIntoView(), 80);
      return () => clearTimeout(id);
    }
  }, [hash]);

  // Get theme colors
  const themeColors = getThemeColors();

  return (
    <>
      {/* Shader Background — fixed, z:-1, lazy-loaded to keep Three.js off the critical path */}
      <Suspense fallback={null}>
        <MikaShaderEffect />
      </Suspense>

      {/* Matter.js physics canvas — z:0, between shader and content */}
      <MatterJSCanvas />

      {/* Page content — z:2, on top */}
      <div
        className="text-ultra scroll-smooth relative overflow-hidden grain"
        style={{ position: 'relative' }}
      >
        {/* Hidden easter egg text */}
        <p style={{ color: themeColors.primary }}>
          {`if you're reading this, you found a secret ;p`}
        </p>

        {/* Global cursor component */}
        <Cursor cursor={cursorType} />

        {/* Navigation header */}
        <NavBar setCursor={setCursorType} />

        {!isComplete() && (
          <LoadingScreen
            progress={getProgressPercentage()}
            total={100}
            secondaryColor={themeColors.secondary}
            setCursor={setCursorType}
          />
        )}

        {/* Hero section */}
        <Hero
          primaryColor={themeColors.primary}
          secondaryColor={themeColors.secondary}
          setCursor={setCursorType}
        />

        {/* Introduction section */}
        <Reveal>
          <Intro
            secondaryColor={themeColors.secondary}
            cursor={''}
            setCursor={setCursorType}
          />
        </Reveal>

        {/* Skills marquee */}
        <Reveal delay={0.1}>
          <SkillsMarquee loop={0} />
        </Reveal>

        {/* Projects showcase */}
        <Projects cursor={''} setCursor={setCursorType} />

        {/* Footer section */}
        <Footer cursor={''} setCursor={setCursorType} />
      </div>
    </>
  );
};

/**
 * Refactored App component
 *
 * Uses context providers instead of prop drilling
 * Implements proper separation of concerns
 * Better performance with optimized re-renders
 */
/**
 * Routes keyed by pathname inside AnimatePresence so the pixel-wipe
 * transition plays between the index and project dossier views
 */
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <AppContent />
            </PageTransition>
          }
        />
        <Route
          path="/projects/:slug"
          element={
            <PageTransition>
              <ProjectPage />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

const AppRefactored = () => {
  return (
    <BrowserRouter>
      <AppProviders>
        <AnimatedRoutes />
      </AppProviders>
    </BrowserRouter>
  );
};

export default AppRefactored;
