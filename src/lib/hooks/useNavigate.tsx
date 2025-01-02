import { useRouter } from './useRouter';

export const useNavigate = () => {
  const { path, push: _push } = useRouter();

  const back = () => {
    window.history.back();
  };

  const push = (url: string | number) => {
    if (typeof url === 'number') {
      if (url === -1) {
        back();
      } else {
        throw new Error('Invalid number passed to push');
      }
    } else {
      _push(url);
    }
  };

  return {
    push,
    path,
    back,
  };
};
