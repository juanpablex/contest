import {useNavigate} from 'react-router-dom';
import { States } from '../types/states';
import { useMutation,useQuery,useQueryClient, useQueryErrorResetBoundary } from '@tanstack/react-query';
import Config from '../config';
import axios,{AxiosError,AxiosResponse} from 'axios';
import Problem from '../types/problem';

  const useFetchStates = () => {
    return useQuery<States[], AxiosError>({
      queryKey: ['states'], // queryKey as an array of strings
      queryFn: async () => {
        const response = await axios.get(`${Config.baseApiUrl}/api/States/GetList`);
        return response.data["data"];
      }
    });
  };

  const useFetchState = (id: number) => {
    return useQuery<States, AxiosError>({
      queryKey: ['states', id], // queryKey as an array of strings
      queryFn: async () => {
        const response = await axios.get(`${Config.baseApiUrl}/api/States/GetById/${id}`);
        return response.data["data"];
      }
    });
  };

  const useAddStates = () => {
    const queryClient = useQueryClient();
    const nav = useNavigate();
    return useMutation({
      mutationFn: async (h: States) => {
        const response = await axios.post(`${Config.baseApiUrl}/api/States/Add`, h);
        return response.data;
      },
      onSuccess: (_, states: States) => {
        queryClient.invalidateQueries({ queryKey: ['states'] });
        if(states.modal?.includes("edit")){
            nav(`/${states.modal}`);
          }else{
            if(states.modal!=""){
              var goto = states.modal;
              nav(`/${goto}/add?modal=${goto}`);
            }else{
              nav("/states");
            }
          }
      },
      onError: (error: AxiosError<Problem>) => {
        console.error(error);
      }
    });
  };

  const useUpdateStates = () => {
    const queryClient = useQueryClient();
    const nav = useNavigate();
    return useMutation({
      mutationFn: async (h: States) => {
        const response = await axios.post(`${Config.baseApiUrl}/api/States/Update`, h);
        return response.data;
      },
      onSuccess: (_, states: States) => {
        queryClient.invalidateQueries({ queryKey: ['states'] });
       
        nav("/states");
      },
      onError: (error: AxiosError<Problem>) => {
        console.error(error);
      }
    });
  };

  const useDeleteStates = () => {
    const queryClient = useQueryClient();
    const nav = useNavigate();
    return useMutation({
      mutationFn: async (h: States) => {
        const response = await axios.post(`${Config.baseApiUrl}/api/States/Delete`, h);
        return response.data;
      },
      onSuccess: (_, states: States) => {
        queryClient.invalidateQueries({ queryKey: ['states'] });
        
        nav("/states");
      },
      onError: (error: AxiosError<Problem>) => {
        console.error(error);
      }
    });
  };

export {useFetchState,
        useFetchStates,
        useUpdateStates,
        useAddStates,
        useDeleteStates
};