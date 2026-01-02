# API Integration Guide

## Overview
The admin dashboard now uses **Axios** for API calls with automatic fallback to mock data when the backend is not available.

## Setup

### 1. Environment Configuration
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Update the API base URL in `.env`:
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_USE_MOCK_DATA=true
```

### 2. API Service Structure

**Files Created:**
- `src/services/api.js` - Axios client configuration with interceptors
- `src/services/dashboardService.js` - Dashboard-specific API functions
- `.env` - Environment variables

### 3. Features Implemented

#### ✅ Axios Configuration
- Base URL configuration via environment variables
- Request interceptor for authentication tokens
- Response interceptor for global error handling
- 10-second timeout for API requests

#### ✅ Dashboard Service
- `getDashboardData()` - Fetch all dashboard data
- `getDashboardStats()` - Fetch statistics only
- `getWardCoverage()` - Fetch ward data
- `getVehicleLocations()` - Fetch vehicle locations for map
- `getRecentActivities()` - Fetch recent activity feed
- `getStaffPerformance()` - Fetch staff metrics
- `getComplaintsData()` - Fetch complaints data

#### ✅ Automatic Fallback
When the backend is not available:
- API calls automatically return mock data
- Console warnings indicate mock data usage
- No errors displayed to users
- Seamless transition when backend becomes available

#### ✅ Auto-Refresh
- Dashboard auto-refreshes every 30 seconds
- Silent background updates (no loading spinner)
- Manual refresh button in header

#### ✅ Error Handling
- Network errors handled gracefully
- 401 errors redirect to login
- User-friendly error messages
- Error state displayed in UI

## Backend Integration

### When Backend is Ready:

1. **Update Environment Variable:**
   ```env
   VITE_API_BASE_URL=https://your-backend-url.com/api
   VITE_USE_MOCK_DATA=false
   ```

2. **Expected API Endpoints:**

   ```
   GET /admin/dashboard - Get all dashboard data
   GET /admin/dashboard/stats - Get statistics
   GET /admin/dashboard/wards - Get ward coverage
   GET /admin/vehicles/locations - Get vehicle locations
   GET /admin/dashboard/activities - Get recent activities
   GET /admin/dashboard/staff-performance - Get staff data
   GET /admin/dashboard/complaints - Get complaints data
   ```

3. **Response Format:**
   The backend should return JSON matching the structure in `dashboardService.js` mock data.

### Authentication
The API client automatically includes JWT tokens from localStorage:
```javascript
Authorization: Bearer <token>
```

Make sure your backend expects this header format.

## Usage in Components

### Import the service:
```javascript
import { getDashboardData } from '../../services/dashboardService';
```

### Fetch data:
```javascript
const fetchData = async () => {
  try {
    const data = await getDashboardData();
    setDashboardData(data);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

## Testing

### With Mock Data (Current):
1. Start dev server: `npm run dev`
2. Dashboard loads with mock data
3. Check console for "Backend not available, using mock data" messages

### With Backend:
1. Update `.env` with backend URL
2. Set `VITE_USE_MOCK_DATA=false`
3. Restart dev server
4. Dashboard will fetch real data from backend

## Troubleshooting

### Issue: "Network error - no response from server"
**Solution:** Backend is not running or URL is incorrect. Check `.env` file.

### Issue: "401 Unauthorized"
**Solution:** Token expired or invalid. User will be redirected to login automatically.

### Issue: CORS errors
**Solution:** Backend must allow CORS from frontend origin. Add CORS middleware on backend.

### Issue: Mock data still showing
**Solution:** 
1. Check `.env` file is properly configured
2. Restart dev server after changing `.env`
3. Clear browser cache

## Next Steps

1. ✅ Axios installed and configured
2. ✅ Dashboard service created with mock fallback
3. ✅ Dashboard component updated to use axios
4. ⏳ **Backend integration** (when ready)
5. ⏳ Add services for other pages (Vehicles, Wards, etc.)
6. ⏳ Implement authentication flow with backend
7. ⏳ Add loading states and error boundaries

## Additional Services Needed

Create similar service files for:
- `vehicleService.js` - For Vehicle management page
- `wardService.js` - For Ward management page
- `complaintService.js` - For Complaints page
- `staffService.js` - For Staff/Attendance pages
- `authService.js` - For login/logout operations

Follow the same pattern as `dashboardService.js` with mock data fallback.
