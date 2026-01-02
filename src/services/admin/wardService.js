// @ts-nocheck
import apiClient from '../../api/api';

// Mock ward data
const getMockWards = () => [
  {
    id: 'WRD001',
    name: 'Ward 1',
    wardNumber: 1,
    area: '5.2 sq km',
    population: 12500,
    households: 2800,
    assignedVehicles: ['OD-05-2345'],
    supervisor: 'Ramesh Patel',
    supervisorPhone: '+91 98765 43210',
    status: 'active',
    collectionFrequency: 'daily',
    totalWasteCollected: 145.5,
    targetWaste: 150
  },
  {
    id: 'WRD002',
    name: 'Ward 2',
    wardNumber: 2,
    area: '4.8 sq km',
    population: 10200,
    households: 2300,
    assignedVehicles: ['OD-05-3456'],
    supervisor: 'Suresh Kumar',
    supervisorPhone: '+91 87654 32109',
    status: 'active',
    collectionFrequency: 'daily',
    totalWasteCollected: 132.8,
    targetWaste: 140
  }
];

/**
 * Fetch all wards
 */
export const getAllWards = async () => {
  try {
    const response = await apiClient.get('/admin/wards');
    return response.data;
  } catch (error) {
    console.warn('Backend not available, using mock data');
    return getMockWards();
  }
};

/**
 * Create new ward
 */
export const createWard = async (wardData) => {
  try {
    const response = await apiClient.post('/admin/wards', wardData);
    return response.data;
  } catch (error) {
    console.warn('Backend not available, returning mock response');
    return { success: true, data: { id: 'WRD' + Date.now(), ...wardData } };
  }
};

/**
 * Update ward
 */
export const updateWard = async (id, wardData) => {
  try {
    const response = await apiClient.put(`/admin/wards/${id}`, wardData);
    return response.data;
  } catch (error) {
    console.warn('Backend not available, returning mock response');
    return { success: true, data: { id, ...wardData } };
  }
};

/**
 * Delete ward
 */
export const deleteWard = async (id) => {
  try {
    const response = await apiClient.delete(`/admin/wards/${id}`);
    return response.data;
  } catch (error) {
    console.warn('Backend not available, returning mock response');
    return { success: true, message: 'Ward deleted' };
  }
};

/**
 * Get ward by ID
 */
export const getWardById = async (id) => {
  try {
    const response = await apiClient.get(`/admin/wards/${id}`);
    return response.data;
  } catch (error) {
    console.warn('Backend not available, using mock data');
    return getMockWards().find(w => w.id === id);
  }
};

export default {
  getAllWards,
  createWard,
  updateWard,
  deleteWard,
  getWardById
};
