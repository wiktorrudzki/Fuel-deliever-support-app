import { useState } from 'react';

const usePromise = <T, A>(
  creator: (args?: T) => Promise<A>,
  onSuccess?: (data: A) => void,
  onFailure?: (reason: unknown) => void
) => {
  const [isLoading, setIsLoading] = useState(false);

  const invoker = () => {
    setIsLoading(true);

    return creator()
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
