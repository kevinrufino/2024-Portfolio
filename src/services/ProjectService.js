/**
 * Project Service for managing project data
 *
 * Handles data fetching, caching, and validation
 * Provides methods for project operations
 *
 * @service
 */

import { ProjectsData } from '../constants.js';

/**
 * Get all projects with caching
 * @returns {Promise<Array>} Array of projects
 */
export const getAllProjects = async () => {
  try {
    // Simulate API call with caching
    const cachedProjects = getCachedProjects();
    if (cachedProjects) {
      return cachedProjects;
    }

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 100));

    // Cache the results
    cacheProjects(ProjectsData);

    return ProjectsData;
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    throw new Error('Unable to load projects');
  }
};

/**
 * Get project by ID
 * @param {string} projectId - Project ID
 * @returns {Promise<Object>} Project data
 */
export const getProjectById = async projectId => {
  try {
    const projects = await getAllProjects();
    const project = projects.find(p => p.title === projectId);

    if (!project) {
      throw new Error(`Project with ID "${projectId}" not found`);
    }

    return project;
  } catch (error) {
    console.error(`Failed to fetch project ${projectId}:`, error);
    throw error;
  }
};

/**
 * Search projects by technology
 * @param {string} searchTerm - Search term
 * @returns {Promise<Array>} Filtered projects
 */
export const searchProjects = async searchTerm => {
  try {
    const projects = await getAllProjects();
    const term = searchTerm.toLowerCase();

    return projects.filter(
      project =>
        project.title.toLowerCase().includes(term) ||
        project.technology.some(tech => tech.toLowerCase().includes(term)) ||
        project.description.toLowerCase().includes(term),
    );
  } catch (error) {
    console.error('Failed to search projects:', error);
    throw error;
  }
};

/**
 * Get projects by technology
 * @param {string} technology - Technology filter
 * @returns {Promise<Array>} Filtered projects
 */
export const getProjectsByTechnology = async technology => {
  try {
    const projects = await getAllProjects();
    const tech = technology.toLowerCase();

    return projects.filter(project =>
      project.technology.some(
        projectTech => projectTech.toLowerCase() === tech,
      ),
    );
  } catch (error) {
    console.error(`Failed to get projects by technology ${technology}:`, error);
    throw error;
  }
};

/**
 * Cache management helpers
 */
const cacheProjects = projects => {
  try {
    localStorage.setItem(
      'cached_projects',
      JSON.stringify({
        data: projects,
        timestamp: Date.now(),
      }),
    );
  } catch (error) {
    console.warn('Failed to cache projects:', error);
  }
};

const getCachedProjects = () => {
  try {
    const cached = localStorage.getItem('cached_projects');
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      // Cache for 5 minutes
      if (Date.now() - timestamp < 5 * 60 * 1000) {
        return data;
      }
    }
  } catch (error) {
    console.warn('Failed to get cached projects:', error);
  }
  return null;
};

/**
 * Clear project cache
 */
export const clearProjectCache = () => {
  try {
    localStorage.removeItem('cached_projects');
  } catch (error) {
    console.warn('Failed to clear project cache:', error);
  }
};
