import { setShowCarousel } from '@reducers/layout';
import { useEffect } from 'react';
import useAppDispatch from './useAppDispatch';

const useHideCarousel = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setShowCarousel(false));

    return () => {
      dispatch(setShowCarousel(true));
    };
  }, [dispatch]);

  return {};
};

export default useHideCarousel;
