import characterWaitingImage from '@public/images/waiting/character-waiting.svg';
import competitionWaitingImage from '@public/images/waiting/competition-waiting.svg';
import Image from 'next/image';
import useHideCarousel from 'src/hook/useHideCarousel';

type Props = {
  type: 'character' | 'competition';
};

const Waiting = ({ type }: Props) => {
  useHideCarousel();

  return (
    <div className='image-container image-container--full'>
      {type === 'character' && (
        <Image src={characterWaitingImage} alt='英雄召喚中' fill />
      )}
      {type === 'competition' && (
        <Image src={competitionWaitingImage} alt='賽事籌備中' fill />
      )}
    </div>
  );
};

export default Waiting;
