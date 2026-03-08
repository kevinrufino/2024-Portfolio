/**
 * Asset Service for managing media assets
 *
 * Handles lazy loading, optimization, and caching
 * Provides methods for asset operations
 *
 * @service
 */

/**
 * Asset cache to prevent duplicate loads
 */
const assetCache = new Map();

/**
 * Lazy load image with caching
 * @param {string} src - Image source
 * @returns {Promise<HTMLImageElement>} Loaded image
 */
export const loadImage = async src => {
  // Return cached image if available
  if (assetCache.has(src)) {
    return assetCache.get(src);
  }

  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      assetCache.set(src, img);
      resolve(img);
    };

    img.onerror = () => {
      reject(new Error(`Failed to load image: ${src}`));
    };

    img.src = src;
  });
};

/**
 * Preload critical images
 * @param {string[]} imageSources - Array of image sources
 * @returns {Promise<Array>} Array of loaded images
 */
export const preloadImages = async imageSources => {
  try {
    const imagePromises = imageSources.map(src => loadImage(src));
    return await Promise.all(imagePromises);
  } catch (error) {
    console.error('Failed to preload images:', error);
    throw error;
  }
};

/**
 * Lazy load video with caching
 * @param {string} src - Video source
 * @returns {Promise<HTMLVideoElement>} Loaded video
 */
export const loadVideo = async src => {
  // Return cached video if available
  if (assetCache.has(src)) {
    return assetCache.get(src);
  }

  return new Promise((resolve, reject) => {
    const video = document.createElement('video');

    video.onloadeddata = () => {
      assetCache.set(src, video);
      resolve(video);
    };

    video.onerror = () => {
      reject(new Error(`Failed to load video: ${src}`));
    };

    video.src = src;
    video.load();
  });
};

/**
 * Get optimized image URL
 * @param {string} src - Original image source
 * @param {Object} options - Optimization options
 * @returns {string} Optimized image URL
 */
export const getOptimizedImageUrl = (src, options = {}) => {
  const { width, height, quality = 80, format = 'webp' } = options;

  // For demo purposes, return original src
  // In production, this would connect to an image optimization service
  const params = new URLSearchParams();

  if (width) params.append('w', width);
  if (height) params.append('h', height);
  params.append('q', quality);
  params.append('f', format);

  const paramString = params.toString();
  return paramString ? `${src}?${paramString}` : src;
};

/**
 * Check if asset is loaded
 * @param {string} src - Asset source
 * @returns {boolean} Whether asset is cached
 */
export const isAssetLoaded = src => {
  return assetCache.has(src);
};

/**
 * Get asset cache statistics
 * @returns {Object} Cache information
 */
export const getAssetCacheStats = () => {
  return {
    size: assetCache.size,
    entries: Array.from(assetCache.entries()),
    memoryUsage: estimateMemoryUsage(),
  };
};

/**
 * Clear asset cache
 * @param {string} [pattern] - Pattern to match for selective clearing
 */
export const clearAssetCache = (pattern = null) => {
  if (pattern) {
    for (const assetKey of assetCache.keys()) {
      if (assetKey.includes(pattern)) {
        assetCache.delete(assetKey);
      }
    }
  } else {
    assetCache.clear();
  }
};

/**
 * Estimate memory usage of cached assets
 * @returns {number} Estimated memory usage in bytes
 */
const estimateMemoryUsage = () => {
  let totalSize = 0;

  for (const [key, asset] of assetCache) {
    // Rough estimation - in real implementation, would calculate actual asset size
    if (asset.src) {
      totalSize += asset.src.length * 2; // Rough estimate
    }
  }

  return totalSize;
};
