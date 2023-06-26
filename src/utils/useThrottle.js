import { useMemo } from 'react';

function useThrottle(cb, cooldown, deps) {
  return useMemo(() => throttle(cb, cooldown), [deps]);
}

export function throttle(fn, cooldown) {
  let lastArgs;

  const run = () => {
    if (lastArgs) {
      fn(...lastArgs);
      lastArgs = undefined;
    }
  };

  const throttled = (...args) => {
    const isOnCooldown = !!lastArgs;

    lastArgs = args;

    if (isOnCooldown) {
      return;
    }

    window.setTimeout(run, cooldown);
  };

  return throttled;
}

export default useThrottle;
