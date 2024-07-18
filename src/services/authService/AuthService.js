
// LocalStorageService can be implemented as a simple utility
const LocalStorageService = {
  getItem: (key) => localStorage.getItem(key),
  setItem: (key, value) => localStorage.setItem(key, value),
  removeItem: (key) => localStorage.removeItem(key),
};

const useAuthService = () => {
  const getAuthorizationHeaders = (userType) => {
    let token = '';
    if (userType === 'admin') {
      token = LocalStorageService.getItem('admintoken') || ''; // Retrieve admin token
    } else {
      token = LocalStorageService.getItem('emptoken') || ''; // Retrieve employee token
    }

    if (!token) {
      throw new Error('Unauthorized: No token found');
    }

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  const isLoggedIn = () => {
    let token = '';
    if (LocalStorageService.getItem('admintoken')) {
      token = LocalStorageService.getItem('admintoken') || '';
    } else if (LocalStorageService.getItem('emptoken')) {
      token = LocalStorageService.getItem('emptoken') || '';
    }
    return !!token;
  };

  const getUserType = () => {
    let user = '';
    if (LocalStorageService.getItem('admintoken')) {
      user = 'admin';
    } else if (LocalStorageService.getItem('emptoken')) {
      user = 'employee';
    }
    return user; // Implement your logic to retrieve the user type
  };

  const isAuthorized = (requiredRoles) => {
    if (!isLoggedIn()) {
      return false; // Not logged in, so not authorized
    }

    const userType = getUserType();
    return requiredRoles.some((role) => role === userType); // Check if user has any of the required roles
  };

  const logout = () => {
    LocalStorageService.removeItem('admintoken');
    LocalStorageService.removeItem('adminid');
    LocalStorageService.removeItem('emptoken');
    LocalStorageService.removeItem('empid');
  };

  return {
    getAuthorizationHeaders,
    isLoggedIn,
    getUserType,
    isAuthorized,
    logout,
  };
};

export default useAuthService;
