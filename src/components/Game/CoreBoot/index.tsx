import { Dispatch, SetStateAction, useEffect } from 'react';

type Props = {
  showCoreBoot: number[];
  setShowCoreBoot: Dispatch<SetStateAction<number[]>>;
};

const CoreBoot = ({ showCoreBoot, setShowCoreBoot }: Props) => {
  const mainCharacter: HTMLElement | null = document
    ? document.querySelector('.game-board__main-character')
    : null;
  const coresElements = showCoreBoot[2]
    ? document.querySelectorAll(`.cores-${showCoreBoot[2]}`)
    : document.querySelectorAll('.cores');

  const getAngle = (x1: number, y1: number) => {
    if (!mainCharacter) return;
    const rect = mainCharacter.getBoundingClientRect();
    let { x, y, width, height } = rect;

    // center
    let cx = x + width / 2;
    let cy = y + height / 2;

    let angle = (Math.atan2(y1 - cy, x1 - cx) * 180) / Math.PI;

    return angle + 90;
  };

  const getElementAngle = (element: Element) => {
    const rect = element.getBoundingClientRect();
    let { x, y, width, height } = rect;

    // center
    let cx = x + width / 2;
    let cy = y + height / 2;

    return getAngle(cx, cy);
  };

  useEffect(() => {
    if (showCoreBoot[1] === 0) return;
    const timer = setTimeout(() => {
      setShowCoreBoot([0, 0]);
    }, showCoreBoot[1] * 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [setShowCoreBoot, showCoreBoot]);

  return (
    <ul className='game-board__core-boot'>
      {Array.from(coresElements).map((item, index) =>
        showCoreBoot[0] > index ? (
          <li
            key={index}
            className={index.toString()}
            style={{ transform: `rotate(${getElementAngle(item)}deg)` }}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='34.875'
              height='34.875'
              viewBox='0 0 34.875 34.875'
            >
              <path
                id='Icon_awesome-arrow-circle-up'
                data-name='Icon awesome-arrow-circle-up'
                d='M.563,18A17.438,17.438,0,1,1,18,35.438,17.434,17.434,0,0,1,.563,18Zm10.1,2.032,5.091-5.309V27.563a1.683,1.683,0,0,0,1.688,1.688h1.125a1.683,1.683,0,0,0,1.688-1.687V14.723l5.091,5.309a1.689,1.689,0,0,0,2.412.028l.766-.773a1.681,1.681,0,0,0,0-2.384L19.2,7.573a1.681,1.681,0,0,0-2.384,0L7.474,16.9a1.681,1.681,0,0,0,0,2.384l.766.773A1.7,1.7,0,0,0,10.659,20.032Z'
                transform='translate(-0.563 -0.563)'
              />
            </svg>
          </li>
        ) : null,
      )}
    </ul>
  );
};

export default CoreBoot;
