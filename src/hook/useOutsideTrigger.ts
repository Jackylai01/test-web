import { isBrowser } from '@helpers/utils';
import { useEffect, useRef, useState } from 'react';

export default function useOutsideTrigger<T extends HTMLElement>(
  initialIsVisible: boolean,
) {
  const [isOutsideTrigger, setIsOutsideTrigger] =
    useState<boolean>(initialIsVisible);
  const ref = useRef<T>(null);

  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsOutsideTrigger(false);
    }
  };

  useEffect(() => {
    if (!isBrowser()) return;
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  return { ref, isOutsideTrigger, setIsOutsideTrigger };
}
