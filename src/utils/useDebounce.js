import { useMemo } from 'react';

function useDebounce(cb, delay, deps) {
  return useMemo(() => debounce(cb, delay), [deps]);
}

export function debounce(fn, delay) {
  let timeoutID;
  let lastArgs;

  const run = () => {
    if (lastArgs) {
      fn(...lastArgs);
      lastArgs = undefined;
    }
  };

  const debounced = (...args) => {
    clearTimeout(timeoutID);
    lastArgs = args;
    timeoutID = window.setTimeout(run, delay);
  };

  debounced.flush = () => {
    clearTimeout(timeoutID);
    run();
  };

  return debounced;
}

export default useDebounce;
