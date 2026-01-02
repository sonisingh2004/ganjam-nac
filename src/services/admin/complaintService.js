// @ts-nocheck
import apiClient from '../../api/api';

// Mock complaint data
const getMockComplaints = () => [
  {
    id: 'CMP001',
    title: 'Missed Garbage Collection',
    citizenName: 'Rajesh Kumar',
    citizenPhone: '+91 98765 43210',
    ward: 'Ward 5',
    location: 'Sector 12, Block A',
    category: 'Missed Collection',
    description: 'Garbage not collected for 2 days in our locality. The bins are overflowing and causing bad smell.',
    status: 'open',
    priority: 'high',
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    updatedAt: new Date(Date.now() - 172800000).toISOString(),
    assignedTo: 'Ramesh Patel (Supervisor)',
    resolvedDate: null,
    notes: 'Follow up required'
  },
  {
    id: 'CMP002',
    title: 'Overflowing Public Bin',
    citizenName: 'Priya Sharma',
    citizenPhone: '+91 87654 32109',
    ward: 'Ward 3',
    location: 'Main Road, Near Temple',
    category: 'Overflowing Bin',
    description: 'Public bin near the temple is overflowing with garbage. Urgent action needed.',
    status: 'in-progress',
    priority: 'medium',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 43200000).toISOString(),
    assignedTo: 'Suresh Kumar (Supervisor)',
    resolvedDate: null,
    notes: 'Vehicle dispatched to location'
  },
  {
    id: 'CMP003',
    title: 'Illegal Dumping Site',
    citizenName: 'Amit Patel',
    citizenPhone: '+91 76543 21098',
    ward: 'Ward 7',
    location: 'Behind Market Complex',
    category: 'Illegal Dumping',
    description: 'People are dumping garbage in open area behind the market. This has become a regular dumping site.',
    status: 'pending',
    priority: 'high',
    createdAt: new Date(Date.now() - 259200000).toISOString(),
    updatedAt: new Date(Date.now() - 259200000).toISOString(),
    assignedTo: 'Vijay Singh (Supervisor)',
    resolvedDate: null,
    notes: 'Inspection scheduled'
  },
  {
    id: 'CMP004',
    title: 'Broken Garbage Bin',
    citizenName: 'Sneha Reddy',
    citizenPhone: '+91 65432 10987',
    ward: 'Ward 2',
    location: 'Park Street',
    category: 'Infrastructure',
    description: 'The public garbage bin at Park Street is broken and needs replacement.',
    status: 'closed',
    priority: 'low',
    createdAt: new Date(Date.now() - 432000000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
    assignedTo: 'Ramesh Patel (Supervisor)',
    resolvedDate: new Date(Date.now() - 86400000).toISOString(),
    notes: 'New bin installed'
  },
  {
    id: 'CMP005',
    title: 'Late Collection Time',
    citizenName: 'Manoj Kumar',
    citizenPhone: '+91 54321 09876',
    ward: 'Ward 4',
    location: 'Green Avenue',
    category: 'Schedule Issue',
    description: 'Garbage collection vehicle arrives very late in the evening, causing inconvenience.',
    status: 'open',
    priority: 'medium',
    createdAt: new Date(Date.now() - 129600000).toISOString(),
    updatedAt: new Date(Date.now() - 129600000).toISOString(),
    assignedTo: 'Suresh Kumar (Supervisor)',
    resolvedDate: null,
    notes: 'Route timing review needed'
  }
];

/**
 * Fetch all complaints
 */
export const getAllComplaints = async () => {
  try {
    const response = await apiClient.get('/admin/complaints');
    return response.data;
  } catch (error) {
    console.warn('Backend not available, using mock data');
    return getMockComplaints();
  }
};

/**
 * Create new complaint
 */
export const createComplaint = async (complaintData) => {
  try {
    const response = await apiClient.post('/admin/complaints', complaintData);
    return response.data;
  } catch (error) {
    console.warn('Backend not available, returning mock response');
    return { success: true, data: { id: 'CMP' + Date.now(), ...complaintData } };
  }
};

/**
 * Update complaint
 */
export const updateComplaint = async (id, complaintData) => {
  try {
    const response = await apiClient.put(`/admin/complaints/${id}`, complaintData);
    return response.data;
  } catch (error) {
    console.warn('Backend not available, returning mock response');
    return { success: true, data: { id, ...complaintData } };
  }
};

/**
 * Delete complaint
 */
export const deleteComplaint = async (id) => {
  try {
    const response = await apiClient.delete(`/admin/complaints/${id}`);
    return response.data;
  } catch (error) {
    console.warn('Backend not available, returning mock response');
    return { success: true, message: 'Complaint deleted' };
  }
};

/**
 * Get complaint statistics
 */
export const getComplaintStats = async () => {
  try {
    const response = await apiClient.get('/admin/complaints/stats');
    return response.data;
  } catch (error) {
    console.warn('Backend not available, using mock data');
    const complaints = getMockComplaints();
    return {
      total: complaints.length,
      open: complaints.filter(c => c.status === 'open').length,
      inProgress: complaints.filter(c => c.status === 'in-progress').length,
      resolved: complaints.filter(c => c.status === 'resolved').length,
      closed: complaints.filter(c => c.status === 'closed').length
    };
  }
};

export default {
  getAllComplaints,
  createComplaint,
  updateComplaint,
  deleteComplaint,
  getComplaintStats
};
