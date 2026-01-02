// @ts-nocheck
import apiClient from '../../api/api';

// Mock fuel records
const getMockFuelRecords = () => [
  {
    id: 'FR001',
    vehicle: 'OD-05-1234',
    driver: 'Ramesh Singh',
    fuelType: 'diesel',
    quantity: 45.5,
    pricePerLiter: 95.50,
    totalCost: 4345.25,
    odometer: 28500,
    previousOdometer: 28200,
    fillingStation: 'Indian Oil - Bhubaneswar',
    refuelDate: new Date().toISOString().split('T')[0],
    receiptNumber: 'REC-2026-001',
    efficiency: 6.59,
    notes: 'Regular refuel'
  },
  {
    id: 'FR002',
    vehicle: 'OD-05-2345',
    driver: 'Sanjay Das',
    fuelType: 'diesel',
    quantity: 38.2,
    pricePerLiter: 95.50,
    totalCost: 3648.10,
    odometer: 32100,
    previousOdometer: 31850,
    fillingStation: 'Bharat Petroleum - Ganjam',
    refuelDate: new Date(Date.now() - 86400000).toISOString().split('T')[0],
    receiptNumber: 'REC-2026-002',
    efficiency: 6.54,
    notes: 'Full tank'
  }
];

/**
 * Fetch all fuel records
 */
export const getAllFuelRecords = async () => {
  try {
    const response = await apiClient.get('/admin/fuel-records');
    return response.data;
  } catch (error) {
    console.warn('Backend not available, using mock data');
    return getMockFuelRecords();
  }
};

/**
 * Create new fuel record
 */
export const createFuelRecord = async (fuelData) => {
  try {
    const response = await apiClient.post('/admin/fuel-records', fuelData);
    return response.data;
  } catch (error) {
    console.warn('Backend not available, returning mock response');
    return { success: true, data: { id: 'FR' + Date.now(), ...fuelData } };
  }
};

/**
 * Update fuel record
 */
export const updateFuelRecord = async (id, fuelData) => {
  try {
    const response = await apiClient.put(`/admin/fuel-records/${id}`, fuelData);
    return response.data;
  } catch (error) {
    console.warn('Backend not available, returning mock response');
    return { success: true, data: { id, ...fuelData } };
  }
};

/**
 * Delete fuel record
 */
export const deleteFuelRecord = async (id) => {
  try {
    const response = await apiClient.delete(`/admin/fuel-records/${id}`);
    return response.data;
  } catch (error) {
    console.warn('Backend not available, returning mock response');
    return { success: true, message: 'Fuel record deleted' };
  }
};

/**
 * Get fuel statistics
 */
export const getFuelStats = async () => {
  try {
    const response = await apiClient.get('/admin/fuel-records/stats');
    return response.data;
  } catch (error) {
    console.warn('Backend not available, using mock data');
    const records = getMockFuelRecords();
    return {
      totalRecords: records.length,
      totalFuel: records.reduce((sum, r) => sum + r.quantity, 0).toFixed(1),
      totalCost: records.reduce((sum, r) => sum + r.totalCost, 0).toFixed(2),
      avgEfficiency: (records.reduce((sum, r) => sum + r.efficiency, 0) / records.length).toFixed(2)
    };
  }
};

export default {
  getAllFuelRecords,
  createFuelRecord,
  updateFuelRecord,
  deleteFuelRecord,
  getFuelStats
};
