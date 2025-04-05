import type { RouteDefaultProps } from '../lib';

type ParameterizedComponentProps = RouteDefaultProps & {
  children?: React.ReactNode;
};

const ParameterizedComponent = (props: ParameterizedComponentProps) => {
  const { params } = props;
  console.log(params);
  return (
    <div>
      Welcome to Parameterized Component, id {params?.id}
      {params?.age ? `, age: ${params?.age}` : ''}
    </div>
  );
};

export default ParameterizedComponent;
