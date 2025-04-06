import ParameterizedComponent from './components/ParameterizedComponent';
import ParameterizedHookComponent from './components/ParameterizedHookComponent';
import { Link, Route, RouteDefaultProps, Routes } from './lib';
import { useNavigate } from './lib/hooks/hooks';
// import { Route } from './lib/providers/Router';

// const allRoutes: Route[] = [
//   {
//     path: '/',
//     component: () => <h1>Welcome to the home page!</h1>,
//   },
//   {
//     path: '/contact',
//     component: () => <h1>Welcome to the contact page!</h1>,
//   },
//   {
//     path: '/test',
//     component: <h1>Welcome to the test page!</h1>,
//   },
// ];

const App = () => {
  const navigate = useNavigate();
  return (
    <div className="app">
      <h1>Hello From Custom React Router DOM!</h1>
      <Link to="/contact">Contact Page</Link> <Link to="/">Home Page</Link>{' '}
      <Link to="test">Test Page</Link> <Link to="sdjaskdjkas">Random URL</Link>{' '}
      <button onClick={() => navigate.push('/contact')}>
        Navigate to contact page
      </button>
      <button onClick={() => navigate.back()}>Go Back</button>
      <Routes>
        <Route path="/" component={() => <h1>Welcome to home page</h1>} />
        <Route
          path="/contact"
          component={() => <h1>Welcome to contact page</h1>}
        />
        <Route path="/test" component={() => <h1>Welcome to test page</h1>} />
        <Route path="/params/:id" component={ParameterizedComponent} />
        <Route path="/params/:id/:age" component={ParameterizedHookComponent} />
        <Route
          path="/params/:id/:age/:height"
          component={(props: RouteDefaultProps) => (
            <ParameterizedComponent {...props} />
          )}
        />
      </Routes>
    </div>
  );
};

export default App;
