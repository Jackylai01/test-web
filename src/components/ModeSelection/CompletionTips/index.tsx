import completionBoard from '@public/game-source/completion-tips/completion-board.png';
import completionClean from '@public/game-source/completion-tips/completion-clean.png';
import Image from 'next/image';
import useAppSelector from 'src/hook/useAppSelector';

type Props = {
  currentMission: string;
};

const CompletionTips = ({ currentMission }: Props) => {
  const { gameInfo } = useAppSelector((state) => state.clientGame);

  const currentProcess: number[] | undefined =
    gameInfo?.detectiveStagesProgress.find(
      (item) => item.category === currentMission,
    )?.process;

  return (
    <article className='game-main__completion-tips'>
      <Image src={completionBoard} alt='闖關預覽主體' />
      <ul className='game-main__completion-cleans'>
        <li>
          {currentProcess?.includes(1) && (
            <Image src={completionClean} alt='輪盤主體' />
          )}
        </li>
        <li>
          {currentProcess?.includes(2) && (
            <Image src={completionClean} alt='輪盤主體' />
          )}
        </li>
        <li>
          {currentProcess?.includes(3) && (
            <Image src={completionClean} alt='輪盤主體' />
          )}
        </li>
      </ul>
    </article>
  );
};

export default CompletionTips;
