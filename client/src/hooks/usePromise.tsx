import { useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const usePromise = <T extends any[], A>(
  creator: (...args: T) => Promise<A>,
  onSuccess?: (data: A) => void,
  onFailure?: (reason: unknown) => void
) => {
  const [isLoading, setIsLoading] = useState(false);

  const invoker = (...args: T) => {
    setIsLoading(true);

    return creator(...args)
      .then((data) => {
        if (onSuccess) {
          onSuccess(data);
        }
      })
      .catch((reason) => {
        if (onFailure) {
          onFailure(reason);
        } else {
          console.error('error');
        }
      })
      .finally(() => setIsLoading(false));
  };

  return [invoker, isLoading] as const;
};

export default usePromise;
