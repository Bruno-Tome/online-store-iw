import { useState, useEffect, Dispatch, SetStateAction } from "react";
import browserStorage from "store";

// Hook to persist state in local storage

type UsePersistStateReturn<T> = [T, Dispatch<SetStateAction<T>>];

export default function usePersistState<T>(
  storageKey: string,
  initialState: T,
): UsePersistStateReturn<T> {
  const [state, setInternalState] = useState<T>(initialState);

  useEffect(() => {
    const storageInBrowser = browserStorage.get(storageKey);
    if (storageInBrowser) {
      setInternalState(storageInBrowser);
    }
  }, [storageKey]);

  const setState: Dispatch<SetStateAction<T>> = (newState) => {
    const value = newState instanceof Function ? newState(state) : newState;
    browserStorage.set(storageKey, value);
    setInternalState(value);
  };

  return [state, setState];
}
