/* eslint-disable @next/next/no-img-element */
import { preliminaryCharacterList } from '@fixtures/character';

import type { NextPage } from 'next';

import LoadingBlock from '@components/LoadingBlock';
import { randomInteger } from '@helpers/random';

import {
  DetectiveGamePhase,
  DetectiveQuizCategoryList,
} from '@models/entities/game/detective-game';
import imgReady from '@public/game-source/button/ready.png';
import {
  socketGameJoinRoomAsync,
  socketGameSetCharacterAsync,
  socketGameSetMissionAsync,
  socketGameSyncCharacterAsync,
} from '@reducers/socket-game/actions';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import useAppDispatch from 'src/hook/useAppDispatch';
import useAppSelector from 'src/hook/useAppSelector';

const CompetitionGamePreliminaryCharacterPage: NextPage = () => {
  const dispatch = useAppDispatch();

  const { game, side, teamOrder } = useAppSelector((state) => state.socketGame);
  const { user } = useAppSelector((state) => state.clientAuth);

  const teamMembers = game?.[`${side}SideUsers`];
  const player = teamMembers?.[teamOrder];

  const [selectedCharacter, setSelectedCharacter] =
    useState<string>('烈日劍士');

  const isJoiningRoom = game?.[`${side}Phase`] === DetectiveGamePhase.創建房間;

  useEffect(() => {
    switch (game?.[`${side}Phase`]) {
      case DetectiveGamePhase.創建房間:
        dispatch(socketGameJoinRoomAsync());
      case DetectiveGamePhase.選擇題型:
        const randomInt = randomInteger(DetectiveQuizCategoryList.length);
        const randomMission = DetectiveQuizCategoryList[randomInt];
        dispatch(socketGameSetMissionAsync({ stage: randomMission }));
    }
  }, [dispatch, game, side]);

  const syncCharacter = () => {
    if (!selectedCharacter) return;
    dispatch(socketGameSyncCharacterAsync({ character: selectedCharacter }));
  };

  const selectCharacter = () => {
    if (!selectedCharacter) return;
    dispatch(socketGameSetCharacterAsync({ character: selectedCharacter }));
  };

  if (isJoiningRoom) {
    return (
      <>
        <LoadingBlock />
        <h2 style={{ textAlign: 'center' }}>
          {teamMembers?.map((member, index) => (
            <div key={index}>{member.name} 已加入</div>
          ))}
          等待其他玩家
        </h2>
      </>
    );
  }

  return (
    <main className='game-main game-main--linear-background-blue'>
      <article className='game-main__container game-main__container--border-mask game-main__container--border-blue'>
        <section className='preliminary-character-select'>
          <ul className='preliminary-character-select__selection'>
            {game?.[`${side}Side`].map((character, index) => (
              <li
                key={index}
                className={
                  teamMembers?.[index]._id === user?._id ? 'self' : undefined
                }
              >
                {character ? (
                  <img
                    src={`/game-source/character-avatar/${character}.png`}
                    alt={character}
                  />
                ) : (
                  <span className='preliminary-character-select__selection-empty'></span>
                )}
                <span className='preliminary-character-select__name'>
                  {teamMembers?.[index].name}
                </span>
              </li>
            ))}
          </ul>
          <ul className='preliminary-character-select__avatars'>
            {preliminaryCharacterList.map((character) => (
              <li
                key={character}
                className={selectedCharacter === character ? 'active' : ''}
                onMouseOver={() => setSelectedCharacter(character)}
                onClick={syncCharacter}
              >
                <img
                  src={`/game-source/character-avatar/${character}.png`}
                  alt={character}
                />
              </li>
            ))}
          </ul>
          <aside className='preliminary-character-select__info'>
            <img
              src={`/images/character/${selectedCharacter}.png`}
              alt={selectedCharacter}
            />
            <a
              className={`preliminary-character-select__btn${
                player?.isReady ? ' active' : ''
              }`}
              onClick={selectCharacter}
            >
              <Image src={imgReady} alt='準備好了' />
            </a>
          </aside>
        </section>
      </article>
    </main>
  );
};

export default CompetitionGamePreliminaryCharacterPage;
