import { useState, useEffect, createContext } from 'react';

export type Route = {
  path: string;
  exact?: boolean;
  params?: string[];
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

  const getRoutes = () => routes;

  return (
    <RouterContext.Provider
      value={{ routes, getRoutes, path, state, children, setRoutes, push }}>
      {children}
    </RouterContext.Provider>
  );
};
