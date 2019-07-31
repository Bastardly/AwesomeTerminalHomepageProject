import { useEffect } from 'react';

type El = HTMLElement | Window | Document 

const useEventListener = (eventName: string, handler: (param?: any) => void, element: El = window) => {
  useEffect(
    () => {
      const isSupported = element && element.addEventListener;
      if (!isSupported) throw Error('Element does not support eventlistener');

      element.addEventListener(eventName, handler);
      return () => {
        element.removeEventListener(eventName, handler);
      };
    },
    [eventName, element]
  );
};

export default useEventListener;