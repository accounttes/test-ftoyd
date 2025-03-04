import api from '../plugins/axios';

export const useMatches = () => {
  const getMatches = async () => {
    const response = await api.get('/fronttemp');
    if (response.status.toString().startsWith('2')) {
      return response.data.data;
    }
    throw new Error('Request failed');
  };

  return {
    getMatches,
  };
};
