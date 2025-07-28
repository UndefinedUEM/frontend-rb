import { useEffect } from 'react';

const useDidMountAndUpdate = (callback, deps) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(callback, deps);
};

export default useDidMountAndUpdate;