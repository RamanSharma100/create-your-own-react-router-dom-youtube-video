import { Routes } from './lib';
import { useRouter } from './lib/hooks/hooks';
import { Route } from './lib/providers/Router';

const allRoutes: Route[] = [
  {
    path: '/',
    component: () => <h1>Welcome to the home page!</h1>,
  },
  {
    path: '/contact',
    component: () => <h1>Welcome to the contact page!</h1>,
  },
  {
    path: '/test',
    component: <h1>Welcome to the test page!</h1>,
  },
];

const App = () => {
  const router = useRouter();
  console.log(router);
  return (
    <div className="app">
      <h1>Hello From Custom React Router DOM!</h1>
      <Routes routes={allRoutes} />
    </div>
  );
};

export default App;
