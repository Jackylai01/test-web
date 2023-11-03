import { characterSrcList } from '@fixtures/character';

import {
  AnswerResultType,
  GameModalType,
  setGameModalType,
} from '@reducers/game';
import { useEffect } from 'react';
import useAppDispatch from 'src/hook/useAppDispatch';
import useAppSelector from 'src/hook/useAppSelector';

const AttackEffect = () => {
  const dispatch = useAppDispatch();

  const { game, side, teamOrder } = useAppSelector((state) => state.socketGame);
  const teamCharacters = game?.[`${side}Side`];
  const { answerResultType } = useAppSelector((state) => state.game);

  const characterName = teamCharacters?.[teamOrder];
  const character = characterSrcList.find(
    (character) => character.name === characterName,
  )!;
  const answerError =
    answerResultType === AnswerResultType.遭受攻擊 ||
    answerResultType === AnswerResultType.陷入陷阱 ||
    answerResultType === AnswerResultType.核心消失;
  const effectType = answerError ? '怪物攻擊' : `${character.type}屬性攻擊`;

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setGameModalType(GameModalType.答題結果));
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [dispatch]);

  return (
    <article className='effect'>
      <video width='100%' height='100%' autoPlay>
        <source
          src={`/game-source/effect/${effectType}.mp4`}
          type='video/mp4'
        />
      </video>
      <audio autoPlay>
        <source
          src={`/game-source/sound/${effectType}.mp3`}
          type='audio/mpeg'
        />
      </audio>
    </article>
  );
};

export default AttackEffect;
