import { useRouter } from './lib/hooks/hooks';

const App = () => {
  const router = useRouter();
  console.log(router);
  return (
    <div className="app">
      <h1>Hello From Custom React Router DOM!</h1>
    </div>
  );
};

export default App;
