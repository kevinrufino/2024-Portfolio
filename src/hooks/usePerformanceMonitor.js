/**
 * Performance monitoring hook
 * 
 * Monitors application performance metrics
 * Provides insights for optimization
 * Tracks render times and memory usage
 * 
 * @hook
 * @returns {Object} Performance monitoring utilities
 */

import { useState, useEffect, useRef } from 'react';

export const usePerformanceMonitor = () => {
  const [metrics, setMetrics] = useState({
    renderTime: 0,
    componentCount: 0,
    memoryUsage: 0,
    fps: 60,
  });

  const renderStartTime = useRef(Date.now());
  const frameCount = useRef(0);
  const lastFrameTime = useRef(Date.now());

  // Monitor render performance
  useEffect(() => {
    const renderEndTime = Date.now();
    const renderTime = renderEndTime - renderStartTime.current;
    
    setMetrics(prev => ({
      ...prev,
      renderTime: Math.max(prev.renderTime, renderTime),
      componentCount: prev.componentCount + 1,
    }));

    renderStartTime.current = Date.now();
  });

  // Monitor FPS and memory usage
  useEffect(() => {
    let animationId;
    
    const measurePerformance = () => {
      const now = Date.now();
      const delta = now - lastFrameTime.current;
      const fps = Math.round(1000 / delta);
      
      frameCount.current += 1;
      lastFrameTime.current = now;

      // Update metrics every 60 frames (approximately 1 second)
      if (frameCount.current % 60 === 0) {
        setMetrics(prev => {
          const newMetrics = {
            ...prev,
            fps: Math.max(prev.fps, fps),
          };

          // Memory usage (if available)
          if (performance.memory) {
            newMetrics.memoryUsage = performance.memory.usedJSHeapSize;
          }

          return newMetrics;
        });
      }

      animationId = requestAnimationFrame(measurePerformance);
    };

    animationId = requestAnimationFrame(measurePerformance);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  // Get performance grade
  const getPerformanceGrade = () => {
    if (metrics.fps >= 55) return 'excellent';
    if (metrics.fps >= 45) return 'good';
    if (metrics.fps >= 30) return 'fair';
    return 'poor';
  };

  // Get optimization suggestions
  const getOptimizations = () => {
    const suggestions = [];
    
    if (metrics.fps < 30) {
      suggestions.push('Consider reducing animation complexity');
      suggestions.push('Optimize images and assets');
    }
    
    if (metrics.renderTime > 100) {
      suggestions.push('Component render time is high');
      suggestions.push('Consider using React.memo');
    }
    
    if (metrics.memoryUsage > 50 * 1024 * 1024) { // 50MB
      suggestions.push('High memory usage detected');
      suggestions.push('Check for memory leaks');
    }
    
    return suggestions;
  };

  return {
    ...metrics,
    getPerformanceGrade,
    getOptimizations,
  };
};
