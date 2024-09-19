import {useNavigate} from 'react-router-dom';
import { GalaTypes } from '../types/galaTypes';
import { useMutation,useQuery,useQueryClient, useQueryErrorResetBoundary } from '@tanstack/react-query';
import Config from '../config';
import axios,{AxiosError,AxiosResponse} from 'axios';
import Problem from '../types/problem';

  const useFetchGalaTypes = () => {
    return useQuery<GalaTypes[], AxiosError>({
      queryKey: ['galaTypes'], // queryKey as an array of strings
      queryFn: async () => {
        const response = await axios.get(`${Config.baseApiUrl}/api/GalaTypes/GetList`);
        return response.data["data"];
      }
    });
  };

  const useFetchGalaType = (id: number) => {
    return useQuery<GalaTypes, AxiosError>({
      queryKey: ['galaTypes', id], // queryKey as an array of strings
      queryFn: async () => {
        const response = await axios.get(`${Config.baseApiUrl}/api/GalaTypes/GetById/${id}`);
        return response.data["data"];
      }
    });
  };

  const useAddGalaTypes = () => {
    const queryClient = useQueryClient();
    const nav = useNavigate();
    return useMutation({
      mutationFn: async (h: GalaTypes) => {
        const response = await axios.post(`${Config.baseApiUrl}/api/GalaTypes/Add`, h);
        return response.data;
      },
      onSuccess: (_, galaTypes: GalaTypes) => {
        queryClient.invalidateQueries({ queryKey: ['galaTypes'] });
        if(galaTypes.modal?.includes("edit")){
            nav(`/${galaTypes.modal}`);
          }else{
            if(galaTypes.modal!=""){
              var goto = galaTypes.modal;
              nav(`/${goto}/add?modal=${goto}`);
            }else{
              nav("/galaTypes");
            }
          }
      },
      onError: (error: AxiosError<Problem>) => {
        console.error(error);
      }
    });
  };

  const useUpdateGalaTypes = () => {
    const queryClient = useQueryClient();
    const nav = useNavigate();
    return useMutation({
      mutationFn: async (h: GalaTypes) => {
        const response = await axios.post(`${Config.baseApiUrl}/api/GalaTypes/Update`, h);
        return response.data;
      },
      onSuccess: (_, galaTypes: GalaTypes) => {
        queryClient.invalidateQueries({ queryKey: ['galaTypes'] });
       
        nav("/galaTypes");
      },
      onError: (error: AxiosError<Problem>) => {
        console.error(error);
      }
    });
  };

  const useDeleteGalaTypes = () => {
    const queryClient = useQueryClient();
    const nav = useNavigate();
    return useMutation({
      mutationFn: async (h: GalaTypes) => {
        const response = await axios.post(`${Config.baseApiUrl}/api/GalaTypes/Delete`, h);
        return response.data;
      },
      onSuccess: (_, galaTypes: GalaTypes) => {
        queryClient.invalidateQueries({ queryKey: ['galaTypes'] });
        
        nav("/galaTypes");
      },
      onError: (error: AxiosError<Problem>) => {
        console.error(error);
      }
    });
  };

export {useFetchGalaType,
        useFetchGalaTypes,
        useUpdateGalaTypes,
        useAddGalaTypes,
        useDeleteGalaTypes
};