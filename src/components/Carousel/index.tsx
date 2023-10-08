import carouselBlue from '@public/Images/Carousel/carousel-blue.png';
import carouselGame from '@public/Images/Carousel/carousel-game.png';
import carouselGreen from '@public/Images/Carousel/carousel-green.png';
import carouselMain from '@public/Images/Carousel/carousel-main.png';
import carouselRed from '@public/Images/Carousel/carousel-red.png';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const carousels = [
  { image: carouselGame },
  { image: carouselMain },
  { image: carouselBlue },
  { image: carouselRed },
  { image: carouselGreen },
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const carouselRef = useRef<HTMLElement>(null);

  const controlMove = (value: number) => {
    const targetCompute = (currentIndex + value) % carousels.length;
    setCurrentIndex(
      targetCompute === -1 ? carousels.length - 1 : targetCompute,
    );
  };

  useEffect(() => {
    setCurrentIndex(0);
  }, [carouselRef]);

  useEffect(() => {
    const timer = setInterval(() => controlMove(1), 5000);

    return () => {
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  return (
    <article className='carousel' ref={carouselRef}>
      <article className='carousel__container'>
        <ul
          className='carousel__items'
          style={{ left: currentIndex * -100 + '%' }}
        >
          {carousels.map(({ image }, index) => (
            <li key={index}>
              {carouselRef.current && (
                <Image src={image} alt='輪播圖' priority={true} />
              )}
            </li>
          ))}
        </ul>
      </article>
      <ul className='carousel__dots'>
        {carousels.map((_item, index) => (
          <li
            key={index}
            className={currentIndex === index ? 'active' : ''}
            onClick={() => setCurrentIndex(index)}
          ></li>
        ))}
      </ul>
      <blockquote className='carousel__controls'>
        <span onClick={() => controlMove(-1)}>{'<'}</span>
        <span onClick={() => controlMove(1)}>{'>'}</span>
      </blockquote>
    </article>
  );
};

export default Carousel;
