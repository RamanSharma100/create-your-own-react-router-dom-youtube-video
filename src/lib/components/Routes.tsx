import React, { useEffect, useState } from 'react';
import { useRouter } from '../hooks/useRouter';
import { Route } from '../providers/Router';

interface IRoutesProps {
  children?: React.ReactNode;
  routes?: Route[];
}

export type RouteDefaultProps = {
  history?: History;
  searchParams?: URLSearchParams;
  params?: Record<string, string>;
};

const Routes: React.FC<IRoutesProps> = ({
  routes,
  children: createdRoutes,
}) => {
  const { path, setRoutes, getRoutes } = useRouter();
  const [routesLoaded, setRoutesLoaded] = useState<boolean>(false);
  const [currentRoute, setCurrentRoute] = useState<Route | null>(null);

  const loadRoutes = () => {
    setRoutes(routes || []);
  };

  const processRoutes = () => {
    const tempRoutes: Route[] = [];

    const makeRoutes = (allRoutes: React.ReactNode, parentPath = '') => {
      const sortRoutes = React.Children.toArray(allRoutes).sort((a: any) => {
        const isParameterized =
          a?.props?.path?.startsWith('/:') || a?.props?.path?.startsWith(':');

        return isParameterized ? 1 : -1;
      });
      sortRoutes.forEach((child) => {
        if (!React.isValidElement(child)) return;

        let { path } = child.props;

        const params = path.match(/:\w+/g);

        if (path) {
          path = path.startsWith('/') ? path : '/' + path;
          const fullPath = parentPath + path;
          tempRoutes.push({
            path: fullPath,
            component: child.props.component,
            params,
          });

          if (child.props.children) {
            makeRoutes(child.props.children, fullPath);
          }
        }
      });
    };

    makeRoutes(createdRoutes);

    console.log('routes', tempRoutes);

    setRoutes(tempRoutes);
  };

  const matchRoute = (path: string, _routes: Route[]) => {
    return (
      _routes
        .map((_route: Route) => {
          const routePath = _route.path.startsWith('/')
            ? _route.path
            : '/' + _route.path;

          const replacePath = routePath.replace(/:[^\s/]+/g, '([^/]+)');

          const regex = new RegExp(`^${replacePath}$`);

          const match = regex.exec(path);

          if (match) {
            const paramNames = (_route.path.match(/:[^\s/]+/g) || []).map(
              (param) => param.slice(1)
            );
            const params: Record<string, string> = {};
            paramNames.forEach((name, index) => {
              params[name] = match[index + 1];
            });

            return {
              ..._route,
              params,
            };
          }

          return null;
        })
        .filter((r) => r !== null)[0] || null
    );
  };

  useEffect(() => {
    setRoutesLoaded(false);
    if (createdRoutes) {
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
    const Component = currentRoute.component as React.ComponentType<any>;
    const searchParams = new URLSearchParams(window.location.search);

    const defaultProps: RouteDefaultProps = {
      history: window.history,
      searchParams,
      params: currentRoute.params,
    };

    if (typeof Component === 'function') {
      return <Component {...defaultProps} />;
    }

    console.log(typeof Component);

    return Component;
  }

  return <h1> 404 | Route Not Found</h1>;
};

export default Routes;
