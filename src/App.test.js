import React from 'react';
import { render, screen, act } from '@testing-library/react';
import App from './App';

// Mock WebGL/canvas-dependent components
jest.mock('./components/ShaderBackground/index.js', () => () => (
  <div data-testid="shader-bg" />
));
jest.mock('./components/Hero/HeroName.js', () => ({
  HeroName: () => <div data-testid="hero-name" />,
}));

// Mock heavy UI components
jest.mock('./components/Cursor.js', () => ({ cursor }) => (
  <div data-testid="cursor" data-type={cursor} />
));
jest.mock('./components/Nav.js', () => ({
  NavBar: () => <nav data-testid="navbar" />,
}));
jest.mock('./components/Hero/Hero.js', () => ({
  Hero: () => <section data-testid="hero" />,
}));
jest.mock('./components/Intro/Intro.js', () => ({
  Intro: () => <section data-testid="intro" />,
}));
jest.mock('./components/Intro/SkillsMarquee.js', () => ({
  SkillsMarquee: () => <div data-testid="skills-marquee" />,
}));
jest.mock('./components/Projects/Projects.js', () => ({
  Projects: () => <section data-testid="projects" />,
}));
jest.mock('./components/Footer.js', () => ({
  Footer: () => <footer data-testid="footer" />,
}));
jest.mock('./services/AssetService.js', () => ({
  preloadImages: jest.fn(),
}));

// Loading interval in AppContent fires every 350ms; total steps = 7
const TICK_MS = 350;
const TOTAL_STEPS = 7;

describe('App', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
  });

  test('renders without crashing', () => {
    render(<App />);
    expect(document.body).toBeInTheDocument();
  });

  test('shows loading screen at 0% initially', () => {
    render(<App />);
    expect(screen.getByText(/Loading\.\.\. 0%/)).toBeInTheDocument();
  });

  test('loading progress increments each tick', () => {
    render(<App />);

    act(() => {
      jest.advanceTimersByTime(TICK_MS);
    });

    // 1/7 ≈ 14%
    expect(screen.getByText(/Loading\.\.\. 14%/)).toBeInTheDocument();
  });

  test('loading screen is replaced by main content after all steps complete', () => {
    render(<App />);

    act(() => {
      jest.advanceTimersByTime(TICK_MS * TOTAL_STEPS);
    });

    expect(screen.queryByText(/Loading\.\.\./)).not.toBeInTheDocument();
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByTestId('hero')).toBeInTheDocument();
    expect(screen.getByTestId('intro')).toBeInTheDocument();
    expect(screen.getByTestId('projects')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  test('shader background renders in main content', () => {
    render(<App />);

    act(() => {
      jest.advanceTimersByTime(TICK_MS * TOTAL_STEPS);
    });

    expect(screen.getByTestId('shader-bg')).toBeInTheDocument();
  });

  test('easter egg text is present after loading', () => {
    render(<App />);

    act(() => {
      jest.advanceTimersByTime(TICK_MS * TOTAL_STEPS);
    });

    expect(
      screen.getByText(/if you're reading this, you found a secret/i),
    ).toBeInTheDocument();
  });

  test('cursor component receives empty string type on initial render', () => {
    render(<App />);

    act(() => {
      jest.advanceTimersByTime(TICK_MS * TOTAL_STEPS);
    });

    expect(screen.getByTestId('cursor')).toHaveAttribute('data-type', '');
  });

  test('skills marquee renders after loading', () => {
    render(<App />);

    act(() => {
      jest.advanceTimersByTime(TICK_MS * TOTAL_STEPS);
    });

    expect(screen.getByTestId('skills-marquee')).toBeInTheDocument();
  });
});
