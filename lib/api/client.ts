
// import axios from 'axios';
// import { getCookie, setCookie } from 'cookies-next';
// import { useAuthStore } from './stores/authStore';

// export const API_URL = process.env.NEXT_PUBLIC_API_URL;

// const api = axios.create({
//   baseURL: API_URL,
//   timeout: 25000,
//   withCredentials: true,
// });

// api.interceptors.request.use((config) => {
//   const accessToken = getCookie('access');
//   const csrfToken = getCookie('csrftoken');
  
//   config.headers.Authorization = accessToken ? `JWT ${accessToken}` : '';
//   config.headers['X-CSRFToken'] = csrfToken || '';
  
//   return config;
// });

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
    
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
      
//       try {
//         const { data } = await axios.post(
//           `${API_URL}/auth/jwt/refresh/`,
//           { refresh: getCookie('refresh') },
//           {
//             withCredentials: true,
//             headers: { 'X-CSRFToken': getCookie('csrftoken') }
//           }
//         );

//         setCookie('access', data.access);
//         return api(originalRequest);
//       } catch (refreshError) {
//         useAuthStore.getState().logout();
//         if (typeof window !== 'undefined') window.location.href = '/login';
//         return Promise.reject(refreshError);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// export default api;