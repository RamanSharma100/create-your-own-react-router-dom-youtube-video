import React, { useEffect, useState } from 'react';
import { useRouter } from '../hooks/useRouter';
import { Route } from '../providers/Router';

interface IRoutesProps {
  children?: React.ReactNode;
  routes?: Route[];
}

const Routes: React.FC<IRoutesProps> = ({ routes, children }) => {
  const { path, setRoutes, getRoutes } = useRouter();
  const [routesLoaded, setRoutesLoaded] = useState<boolean>(false);
  const [currentRoute, setCurrentRoute] = useState<Route | null>(null);

  const loadRoutes = () => {
    setRoutes(routes || []);
  };

  const processRoutes = () => {
    const tempRoutes: Route[] = [];
    React.Children.forEach(children, (child) => {
      if (!React.isValidElement(child)) return;

      let { path } = child.props;

      if (path) {
        path = path.startsWith('/') ? path : '/' + path;
        tempRoutes.push({
          path,
          component: child.props.component,
        });
      }
    });

    setRoutes(tempRoutes);
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
    if (children) {
      processRoutes();
    } else if (routes) {
      loadRoutes();
    }

    const route: Route | null = matchRoute(path, getRoutes());

    if (route) {
      setCurrentRoute(route);
    } else {
      setCurrentRoute(null);
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
