import { useEffect, useRef } from 'react';

const DEFAULT_DELAY = 2000;

/**
 * useInterval hook
 * @param callback callback function
 * @param delay interval delay (default set to 2 minutes)
 */
const useInterval = (callback, delay = DEFAULT_DELAY) => {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function fetch() {
      savedCallback.current();
    }

    if (delay !== null) {
      let id = setInterval(fetch, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

export { useInterval };
