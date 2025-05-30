// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import apiClient from '@/lib/api/client';
// import type { UserFormData } from '@/lib/api/types/user';

// const createUser = async (userData: UserFormData): Promise<User> => {
//   const { data } = await apiClient.post('/users', userData);
//   return data;
// };

// export const useCreateUser = () => {
//   const queryClient = useQueryClient();
  
//   return useMutation({
//     mutationFn: createUser,
//     onSuccess: () => {
//       queryClient.invalidateQueries(['users']);
//     },
//     onError: (error) => {
//       console.error('User creation failed:', error);
//     }
//   });
// };