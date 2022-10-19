import { useCallback, useEffect } from 'react';

export default function useInit(callback: () => void) {
  const handleCallback = useCallback(callback, [callback]);
  useEffect(() => {
    handleCallback();
  }, [])
}