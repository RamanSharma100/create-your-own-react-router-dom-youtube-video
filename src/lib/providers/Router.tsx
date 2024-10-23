import { useState, useEffect, createContext } from 'react';

type Route = {
  path: string;
  exact?: boolean;
  params?: string[];
  active?: boolean;
  activeClass?: string;
  componenent: React.ComponentType | React.ElementType | JSX.Element;
};

type State = {
  [key: string]: any;
};

interface IRouterContextType {
  routes: Route[];
  children: React.ReactNode | JSX.Element;
  setRoutes: React.Dispatch<React.SetStateAction<Route[]>>;
  push: (path: string, state?: State) => void;
}

interface IRouterProps {
  children: React.ReactNode | JSX.Element;
}

export const RouterContext = createContext<IRouterContextType | null>(null);

export const Router: React.FC<IRouterProps> = ({ children }) => {
  const [routes, setRoutes] = useState<Route[]>([]);

  const push = (path: string, state?: State) => {
    window.history.pushState(state, '', path);
    // window.dispatchEvent(new Event('popstate'));
  };

  useEffect(() => {
    window.addEventListener('popstate', () => {
      console.log('popstate');
    });

    return () => {
      window.removeEventListener('popstate', () => {
        console.log('popstate');
      });
    };
  }, []);

  return (
    <RouterContext.Provider value={{ routes, children, setRoutes, push }}>
      {children}
    </RouterContext.Provider>
  );
};
