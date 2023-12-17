import axiosInstance from './axiosInstance';

export const GET_VOLUMES = async (query: string, params: string) => {
    const response = await axiosInstance.get(`/volumes?q=${query}&${params}`);
    return response.data;
};