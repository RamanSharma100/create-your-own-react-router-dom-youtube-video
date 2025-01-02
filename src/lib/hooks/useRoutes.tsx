import { useRouter } from './useRouter';

export const useRoutes = () => {
  const { path, routes, getRoutes, setRoutes, state } = useRouter();

  return {
    path,
    routes,
    getRoutes,
    setRoutes,
    state,
  };
};
