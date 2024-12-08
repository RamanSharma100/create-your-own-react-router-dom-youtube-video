import { useEffect, useState } from 'react';
import { useRouter } from '../hooks/useRouter';
import { Route } from '../providers/Router';

interface IRoutesProps {
  children?: React.ReactNode;
  routes: Route[];
}

const Routes: React.FC<IRoutesProps> = ({ routes }) => {
  const { path, setRoutes, getRoutes } = useRouter();
  const [routesLoaded, setRoutesLoaded] = useState<boolean>(false);
  const [currentRoute, setCurrentRoute] = useState<Route | null>(null);

  const loadRoutes = () => {
    setRoutes(routes);
  };

  const matchRoute = (path: string, _routes: Route[]) => {
    return (
      _routes.find((_route: Route) => {
        const routePath = _route.path.startsWith('/')
          ? _route.path
          : '/' + _route.path;

        return routePath.toLowerCase() === path.toLowerCase();
      }) || null
    );
  };

  useEffect(() => {
    setRoutesLoaded(false);
    loadRoutes();

    const route: Route | null = matchRoute(path, getRoutes());

    if (route) {
      setCurrentRoute(route);
    }

    setRoutesLoaded(true);
  }, [path]);

  if (!routesLoaded) return null;

  if (currentRoute) {
    const Component = currentRoute.component;
    if (typeof Component === 'function') {
      return <Component />;
    }

    return Component;
  }

  return <h1> 404 | Route Not Found</h1>;
};

export default Routes;
