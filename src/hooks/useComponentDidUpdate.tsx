import { useRef, useEffect } from "react";

export const useComponentDidUpdate = (
  effect: () => void,
  dependencies: any[] = []
) => {
  const hasMounted = useRef(false);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    effect();
  }, dependencies);
};

export default useComponentDidUpdate;
