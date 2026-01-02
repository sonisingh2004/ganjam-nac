// @ts-nocheck
import apiClient from '../../api/api';

/**
 * Fetch all supervisors from localStorage (for now)
 * Later this will be replaced with backend API
 */
export const getAllSupervisors = async () => {
  try {
    const response = await apiClient.get('/admin/supervisors');
    return response.data;
  } catch (error) {
    console.warn('Backend not available, using localStorage');
    const supervisors = JSON.parse(localStorage.getItem('supervisors') || '[]');
    return supervisors;
  }
};

/**
 * Create new supervisor
 */
export const createSupervisor = async (supervisorData) => {
  try {
    const response = await apiClient.post('/admin/supervisors', supervisorData);
    return response.data;
  } catch (error) {
    console.warn('Backend not available, using localStorage');
    const supervisors = JSON.parse(localStorage.getItem('supervisors') || '[]');
    const newSupervisor = {
      id: 'SUP' + Date.now(),
      ...supervisorData,
      createdAt: new Date().toISOString()
    };
    supervisors.push(newSupervisor);
    localStorage.setItem('supervisors', JSON.stringify(supervisors));
    return { success: true, data: newSupervisor };
  }
};

/**
 * Update supervisor
 */
export const updateSupervisor = async (id, supervisorData) => {
  try {
    const response = await apiClient.put(`/admin/supervisors/${id}`, supervisorData);
    return response.data;
  } catch (error) {
    console.warn('Backend not available, using localStorage');
    const supervisors = JSON.parse(localStorage.getItem('supervisors') || '[]');
    const index = supervisors.findIndex(s => s.id === id);
    if (index !== -1) {
      supervisors[index] = { ...supervisors[index], ...supervisorData };
      localStorage.setItem('supervisors', JSON.stringify(supervisors));
      return { success: true, data: supervisors[index] };
    }
    return { success: false, message: 'Supervisor not found' };
  }
};

/**
 * Delete supervisor
 */
export const deleteSupervisor = async (id) => {
  try {
    const response = await apiClient.delete(`/admin/supervisors/${id}`);
    return response.data;
  } catch (error) {
    console.warn('Backend not available, using localStorage');
    const supervisors = JSON.parse(localStorage.getItem('supervisors') || '[]');
    const filtered = supervisors.filter(s => s.id !== id);
    localStorage.setItem('supervisors', JSON.stringify(filtered));
    return { success: true, message: 'Supervisor deleted' };
  }
};

/**
 * Get supervisor by ID
 */
export const getSupervisorById = async (id) => {
  try {
    const response = await apiClient.get(`/admin/supervisors/${id}`);
    return response.data;
  } catch (error) {
    console.warn('Backend not available, using localStorage');
    const supervisors = JSON.parse(localStorage.getItem('supervisors') || '[]');
    return supervisors.find(s => s.id === id);
  }
};

export default {
  getAllSupervisors,
  createSupervisor,
  updateSupervisor,
  deleteSupervisor,
  getSupervisorById
};
