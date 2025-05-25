import { useEffect, useState } from 'react';

export default function useLocalStorageState<T>(
  name: string,
  initialState: T | (() => T)
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => {
    if (typeof window === 'undefined') return typeof initialState === 'function'
      ? (initialState as () => T)()
      : initialState;

    const storageItem = localStorage.getItem(name);
    if (storageItem) {
      try {
        return JSON.parse(storageItem);
      } catch {
        // fallback if JSON parsing fails
        localStorage.removeItem(name);
      }
    }

    return typeof initialState === 'function' ? (initialState as () => T)() : initialState;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (state === undefined) {
      localStorage.removeItem(name);
    } else {
      localStorage.setItem(name, JSON.stringify(state));
    }
  }, [name, state]);

  return [state, setState];
}
