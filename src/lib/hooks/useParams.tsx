import { useRouter } from './useRouter';

export const useParams = () => {
  const { getParams } = useRouter();

  return {
    getParams,
    params: getParams(),
  };
};
