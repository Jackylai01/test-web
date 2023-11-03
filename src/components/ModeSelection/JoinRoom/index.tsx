import ContainerBoard from '@components/ContainerBoard';
import Form from '@components/Form';
import LoadingLayout from '@components/LoadingLayout';
import { LocalStorageKey } from '@enums/local-storage-key';
import { loadJson, saveJson } from '@helpers/local-storage';

import { DetectiveGamePhase } from '@models/entities/game/detective-game';
import {
  socketGameGetFinalGameAsync,
  socketGameJoinRoomAsync,
} from '@reducers/socket-game/actions';
import { useEffect } from 'react';
import useAppDispatch from 'src/hook/useAppDispatch';
import useAppSelector from 'src/hook/useAppSelector';

const JoinRoom = () => {
  const dispatch = useAppDispatch();
  const roomId = loadJson<string>(LocalStorageKey.ROOM_ID);

  const { game } = useAppSelector((state) => state.socketGame);

  useEffect(() => {
    if (!roomId) return;
    dispatch(socketGameGetFinalGameAsync(roomId));
  }, [dispatch, roomId]);

  useEffect(() => {
    if (
      !game ||
      game.leftPhase !== DetectiveGamePhase.創建房間 ||
      game.rightPhase !== DetectiveGamePhase.創建房間 ||
      game.leftSideUsers?.length !== 3 ||
      game.rightSideUsers?.length !== 3
    ) {
      return;
    }
    dispatch(socketGameJoinRoomAsync());
  }, [dispatch, game]);

  const onSubmit = (data: any) => {
    dispatch(socketGameGetFinalGameAsync(data.code));
    saveJson<string>(LocalStorageKey.ROOM_ID, data.code);
  };

  return (
    <LoadingLayout isLoading={!!roomId}>
      <div style={{ margin: '10%' }}>
        <ContainerBoard title='加入房間'>
          <Form
            fieldConfigs={[
              {
                name: 'code',
                type: 'text',
                label: '房號',
                required: true,
              },
            ]}
            onSubmit={onSubmit}
          >
            <button type='submit' className='btn margin-top'>
              確定送出
            </button>
          </Form>
        </ContainerBoard>
      </div>
    </LoadingLayout>
  );
};

export default JoinRoom;
