// @ts-nocheck
import apiClient from '../../api/api';

// Mock vehicle data
const getMockVehicles = () => [
  {
    id: 'VEH001',
    registrationNumber: 'OD-05-1234',
    type: 'compactor',
    model: 'Tata LPT 1613',
    status: 'running',
    capacity: '5 tons',
    assignedWard: 'Ward 5',
    driverName: 'Ramesh Singh',
    driverPhone: '+91 98765 43210',
    lastService: '2025-12-15',
    nextService: '2026-01-15',
    fuelType: 'diesel',
    fuelLevel: 75,
    location: { lat: 20.2961, lng: 85.8245 },
    speed: 35,
    maintenanceStatus: 'good',
    odometer: 28500,
    averageSpeed: 32,
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'VEH002',
    registrationNumber: 'OD-05-5678',
    type: 'tipper',
    model: 'Ashok Leyland 1616',
    status: 'standing',
    capacity: '3 tons',
    assignedWard: 'Ward 3',
    driverName: 'Suresh Kumar',
    driverPhone: '+91 87654 32109',
    lastService: '2025-12-20',
    nextService: '2026-01-20',
    fuelType: 'diesel',
    fuelLevel: 45,
    location: { lat: 20.3021, lng: 85.8321 },
    speed: 0,
    maintenanceStatus: 'good',
    odometer: 18750,
    averageSpeed: 28,
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'VEH003',
    registrationNumber: 'OD-05-9012',
    type: 'compactor',
    model: 'Eicher Pro 1080',
    status: 'running',
    capacity: '4.5 tons',
    assignedWard: 'Ward 7',
    driverName: 'Prakash Patel',
    driverPhone: '+91 76543 21098',
    lastService: '2025-12-10',
    nextService: '2026-01-10',
    fuelType: 'diesel',
    fuelLevel: 60,
    location: { lat: 20.2890, lng: 85.8165 },
    speed: 42,
    maintenanceStatus: 'service-due',
    odometer: 31200,
    averageSpeed: 30,
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'VEH004',
    registrationNumber: 'OD-05-3456',
    type: 'mini-truck',
    model: 'Mahindra Bolero Pickup',
    status: 'stopped',
    capacity: '1.5 tons',
    assignedWard: 'Ward 2',
    driverName: 'Vijay Sharma',
    driverPhone: '+91 65432 10987',
    lastService: '2025-12-25',
    nextService: '2026-01-25',
    fuelType: 'diesel',
    fuelLevel: 30,
    location: { lat: 20.2945, lng: 85.8290 },
    speed: 0,
    maintenanceStatus: 'good',
    odometer: 12450,
    averageSpeed: 25,
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'VEH005',
    registrationNumber: 'OD-05-2345',
    type: 'tipper',
    model: 'Tata 909',
    status: 'running',
    capacity: '2.5 tons',
    assignedWard: 'Ward 4',
    driverName: 'Sanjay Das',
    driverPhone: '+91 54321 09876',
    lastService: '2025-12-18',
    nextService: '2026-01-18',
    fuelType: 'diesel',
    fuelLevel: 85,
    location: { lat: 20.3005, lng: 85.8200 },
    speed: 38,
    maintenanceStatus: 'good',
    odometer: 22800,
    averageSpeed: 29,
    lastUpdated: new Date().toISOString()
  }
];

/**
 * Fetch all vehicles
 */
export const getAllVehicles = async () => {
  try {
    const response = await apiClient.get('/admin/vehicles');
    return response.data;
  } catch (error) {
    console.warn('Backend not available, using mock data');
    return getMockVehicles();
  }
};

/**
 * Create new vehicle
 */
export const createVehicle = async (vehicleData) => {
  try {
    const response = await apiClient.post('/admin/vehicles', vehicleData);
    return response.data;
  } catch (error) {
    console.warn('Backend not available, returning mock response');
    return { success: true, data: { id: 'VEH' + Date.now(), ...vehicleData } };
  }
};

/**
 * Update vehicle
 */
export const updateVehicle = async (id, vehicleData) => {
  try {
    const response = await apiClient.put(`/admin/vehicles/${id}`, vehicleData);
    return response.data;
  } catch (error) {
    console.warn('Backend not available, returning mock response');
    return { success: true, data: { id, ...vehicleData } };
  }
};

/**
 * Delete vehicle
 */
export const deleteVehicle = async (id) => {
  try {
    const response = await apiClient.delete(`/admin/vehicles/${id}`);
    return response.data;
  } catch (error) {
    console.warn('Backend not available, returning mock response');
    return { success: true, message: 'Vehicle deleted' };
  }
};

/**
 * Get vehicle by ID
 */
export const getVehicleById = async (id) => {
  try {
    const response = await apiClient.get(`/admin/vehicles/${id}`);
    return response.data;
  } catch (error) {
    console.warn('Backend not available, using mock data');
    return getMockVehicles().find(v => v.id === id);
  }
};

export default {
  getAllVehicles,
  createVehicle,
  updateVehicle,
  deleteVehicle,
  getVehicleById
};
