import { useState, useEffect, createContext } from 'react';

export type Route = {
  path: string;
  exact?: boolean;
  params?: Record<string, string>;
  active?: boolean;
  activeClass?: string;
  component: React.ComponentType | React.ElementType | JSX.Element;
};

type State = {
  [key: string]: any;
};

interface IRouterContextType {
  routes: Route[];
  path: string;
  state: any;
  getRoutes: () => Route[];
  children: React.ReactNode | JSX.Element;
  setRoutes: React.Dispatch<React.SetStateAction<Route[]>>;
  getParams: () => Record<string, string> | string[];
  push: (path: string, state?: State) => void;
}

interface IRouterProps {
  children: React.ReactNode | JSX.Element;
}

export const RouterContext = createContext<IRouterContextType | null>(null);

export const Router: React.FC<IRouterProps> = ({ children }) => {
  const [state, setState] = useState<any>();
  const [path, setPath] = useState<string>('');
  const [routes, setRoutes] = useState<Route[]>([]);

  const push = (path: string, state?: State) => {
    window.history.pushState(state, '', path);
    setPath(path);
  };

  const handlePopState = (e: PopStateEvent) => {
    setPath(window.location.pathname);
    setState(e.state);
  };

  useEffect(() => {
    setPath(window.location.pathname);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const matchRoute = (path: string, _routes: Route[]) => {
    const route = _routes.map((_route: Route) => {
      const routePath = _route.path.startsWith('/')
        ? _route.path
        : '/' + _route.path;

      const replacePath = routePath.replace(/:[^\s/]+/g, '([^/]+)');

      const regex = new RegExp(`^${replacePath}$`);

      const match = regex.exec(path);

      if (match) {
        const paramNames = (_route.path.match(/:[^\s/]+/g) || []).map((param) =>
          param.slice(1)
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
    });
    return route.filter((r) => r !== null)[0];
  };

  const getParams = () => {
    const route = matchRoute(path, routes);
    return route?.params;
  };

  const getRoutes = () => routes;

  return (
    <RouterContext.Provider
      value={{
        routes,
        getRoutes,
        path,
        state,
        children,
        setRoutes,
        push,
        getParams,
      }}>
      {children}
    </RouterContext.Provider>
  );
};
