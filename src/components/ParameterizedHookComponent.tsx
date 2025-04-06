import { useParams } from '../lib/hooks/hooks';

const ParameterizedHookComponent = () => {
  const { getParams } = useParams();
  return <p>{JSON.stringify(getParams())}</p>;
};

export default ParameterizedHookComponent;
