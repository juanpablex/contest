import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import Config from '../config';
import Problem from '../types/problem';
import { EntityOptions } from '../types/entityOptions';

// Generic hook for fetching a list of entities
const useFetchEntities = <T>({endpoint,navTo=""}:EntityOptions) => {
  return useQuery<T[], AxiosError>({
    queryKey: [navTo.slice(1)],
    queryFn: async () => {
      const response = await axios.get(`${Config.baseApiUrl}${endpoint}/GetList`);
      return response.data["data"];
    }
  });
};

// Generic hook for fetching a single entity by ID
const useFetchEntity = <T>({id,endpoint,navTo=""}:EntityOptions) => {
  return useQuery<T, AxiosError>({
    queryKey: [navTo?.slice(1), id],
    queryFn: async () => {
      const response = await axios.get(`${Config.baseApiUrl}${endpoint}/GetById/${id}`);
      return response.data["data"];
    }
  });
};

// Generic hook for adding an entity
const useAddEntity = <T extends { modal?: string | null }>({endpoint,navTo=""}:EntityOptions) => {
  const queryClient = useQueryClient();
  const nav = useNavigate();
  
  return useMutation({
    mutationFn: async (entity: T) => {
      const response = await axios.post(`${Config.baseApiUrl}${endpoint}/Add`, entity);
      return response.data;
    },
    onSuccess: (_, entity: T) => {
      queryClient.invalidateQueries({ queryKey: [navTo.slice(1)] });
      if (entity.modal?.includes("edit")) {
        nav(`/${entity.modal}`);
      } else {
        if (entity.modal !== "") {
          nav(`/${entity.modal}/add?modal=${entity.modal}`);
        } else {
          nav(navTo);
        }
      }
    },
    onError: (error: AxiosError<Problem>) => {
      console.error(error);
    }
  });
};

// Generic hook for updating an entity
const useUpdateEntity = <T>({endpoint,navTo=""}:EntityOptions) => {
  const queryClient = useQueryClient();
  const nav = useNavigate();

  return useMutation({
    mutationFn: async (entity: T) => {
      const response = await axios.post(`${Config.baseApiUrl}${endpoint}/Update`, entity);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [navTo.slice(1)] });
      nav(navTo);
    },
    onError: (error: AxiosError<Problem>) => {
      console.error(error);
    }
  });
};

// Generic hook for deleting an entity
const useDeleteEntity = <T>({endpoint,navTo=""}:EntityOptions) => {
  const queryClient = useQueryClient();
  const nav = useNavigate(); 

  return useMutation({
    mutationFn: async (entity: T) => {
      const response = await axios.post(`${Config.baseApiUrl}${endpoint}/Delete`, entity);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [navTo.slice(1)] });
      nav(navTo);
    },
    onError: (error: AxiosError<Problem>) => {
      console.error(error);
    }
  });
};

export {
  useFetchEntities,
  useFetchEntity,
  useAddEntity,
  useUpdateEntity,
  useDeleteEntity
};
