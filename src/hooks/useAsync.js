import { useState, useCallback } from 'react';

import useIsMountedRef from './useIsMountedRef';

const useAsync = (callback, deps) => {
  const [loading, setLoading] = useState(false);
  const isMountedRef = useIsMountedRef();

  const call = useCallback(async (...args) => {
    try {
      setLoading(true);
      const response = await callback(...args);
      return response;
    } finally {
      setTimeout(() => {
        if (isMountedRef.current) {
          setLoading(false);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { loading, call };
};

export default useAsync;