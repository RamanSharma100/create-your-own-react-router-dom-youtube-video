import { useRouter } from '../hooks/useRouter';

type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  to: string;
  state?: any;
  navlink?: boolean;
  children: React.ReactNode | React.ReactElement | JSX.Element;
};

const Link: React.FC<LinkProps> = ({
  to,
  state,
  navlink = false,
  children,
  ...props
}) => {
  const { push, path } = useRouter();

  to = to.startsWith('/') ? to : '/' + to;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    push(to, state);
  };

  return (
    <a {...props} href={to} onClick={handleClick}>
      {children}
    </a>
  );
};

export default Link;
