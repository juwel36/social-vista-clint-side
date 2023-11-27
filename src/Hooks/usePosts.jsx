import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxoisPublic from './useAxiosPublic';

const usePosts = () => {
  const axiospublic = useAxoisPublic();

  const { refetch, isPending, data: comments } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const res = await axiospublic.get('/posts');
      return res.data;
    },
  });

  return [refetch, isPending, comments];
};

export default usePosts;
