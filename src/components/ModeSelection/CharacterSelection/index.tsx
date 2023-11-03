/* eslint-disable @next/next/no-img-element */
import { personalCharacterList } from '@fixtures/character';

import type { NextPage } from 'next';

import enterGame from '@public/game-source/button/enter-game.png';
import {
  socketGameResetDifficultyAsync,
  socketGameSetCharacterAsync,
} from '@reducers/socket-game/actions';
import Image from 'next/image';
import { useState } from 'react';
import useAppDispatch from 'src/hook/useAppDispatch';

const CompetitionGamePersonalCharacterPage: NextPage = () => {
  const dispatch = useAppDispatch();

  const [selectedCharacter, setSelectedCharacter] = useState<string>();

  const selectCharacter = () => {
    if (!selectedCharacter) return;
    dispatch(socketGameSetCharacterAsync({ character: selectedCharacter }));
  };

  return (
    <main className='game-main game-main--linear-background-blue'>
      <article className='game-main__container game-main__container--border-mask game-main__container--border-blue'>
        <span
          className='btn btn--border game-main__back'
          onClick={() => dispatch(socketGameResetDifficultyAsync())}
        >
          上一頁
        </span>
        <section className='character-select'>
          <ul className='character-select__list'>
            {personalCharacterList.map((character) => (
              <li
                key={character}
                className={selectedCharacter === character ? 'active' : ''}
                onClick={() => setSelectedCharacter(character)}
              >
                <img
                  src={
                    selectedCharacter === character
                      ? `/images/character/${character}.png`
                      : `/images/character/no-skill/${character}.png`
                  }
                  alt={character}
                />
              </li>
            ))}
          </ul>
          <a
            className={`character-select__btn${
              selectedCharacter ? ' active' : ''
            }`}
            onClick={selectCharacter}
          >
            <Image src={enterGame} alt='開始按鈕' />
          </a>
        </section>
      </article>
    </main>
  );
};

export default CompetitionGamePersonalCharacterPage;
