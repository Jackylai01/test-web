import ContainerBoard from '@components/ContainerBoard';
import Form from '@components/Form';
import LoadingLayout from '@components/LoadingLayout';
import { LocalStorageKey } from '@enums/local-storage-key';
import { loadJson, saveJson } from '@helpers/local-storage';
import { socketGameGetFinalGamePublicAsync } from '@reducers/socket-game/actions';
import { useEffect } from 'react';
import useAppDispatch from 'src/hook/useAppDispatch';

const ViewerJoinRoom = () => {
  const dispatch = useAppDispatch();
  const roomId = loadJson<string>(LocalStorageKey.ROOM_ID);

  useEffect(() => {
    if (!roomId) return;
    dispatch(socketGameGetFinalGamePublicAsync(roomId));
  }, [dispatch, roomId]);

  const onSubmit = (data: any) => {
    dispatch(socketGameGetFinalGamePublicAsync(data.code));
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

export default ViewerJoinRoom;
