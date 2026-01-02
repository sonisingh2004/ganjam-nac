// @ts-nocheck
import apiClient from '../../api/api';

// Mock waste collection data
const getMockWasteCollections = () => [
  {
    id: 'WC001',
    ward: 'Ward 1',
    vehicle: 'OD-05-2345',
    driver: 'Sanjay Das',
    route: 'Route A1',
    wasteType: 'Mixed',
    quantity: 12.5,
    targetQuantity: 15,
    collectionDate: new Date().toISOString().split('T')[0],
    startTime: '06:00',
    endTime: '10:30',
    status: 'completed',
    notes: 'Normal collection'
  },
  {
    id: 'WC002',
    ward: 'Ward 2',
    vehicle: 'OD-05-3456',
    driver: 'Vijay Sharma',
    route: 'Route B1',
    wasteType: 'Mixed',
    quantity: 10.8,
    targetQuantity: 14,
    collectionDate: new Date().toISOString().split('T')[0],
    startTime: '06:15',
    endTime: '10:45',
    status: 'completed',
    notes: 'Good collection rate'
  }
];

/**
 * Fetch all waste collections
 */
export const getAllWasteCollections = async () => {
  try {
    const response = await apiClient.get('/admin/waste-collections');
    return response.data;
  } catch (error) {
    console.warn('Backend not available, using mock data');
    return getMockWasteCollections();
  }
};

/**
 * Create new waste collection record
 */
export const createWasteCollection = async (collectionData) => {
  try {
    const response = await apiClient.post('/admin/waste-collections', collectionData);
    return response.data;
  } catch (error) {
    console.warn('Backend not available, returning mock response');
    return { success: true, data: { id: 'WC' + Date.now(), ...collectionData } };
  }
};

/**
 * Update waste collection
 */
export const updateWasteCollection = async (id, collectionData) => {
  try {
    const response = await apiClient.put(`/admin/waste-collections/${id}`, collectionData);
    return response.data;
  } catch (error) {
    console.warn('Backend not available, returning mock response');
    return { success: true, data: { id, ...collectionData } };
  }
};

/**
 * Delete waste collection
 */
export const deleteWasteCollection = async (id) => {
  try {
    const response = await apiClient.delete(`/admin/waste-collections/${id}`);
    return response.data;
  } catch (error) {
    console.warn('Backend not available, returning mock response');
    return { success: true, message: 'Waste collection deleted' };
  }
};

export default {
  getAllWasteCollections,
  createWasteCollection,
  updateWasteCollection,
  deleteWasteCollection
};
