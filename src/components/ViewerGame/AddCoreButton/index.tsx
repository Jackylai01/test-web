import { checkOrderState, findRandomEmptyPosition } from '@helpers/gameMap';

import { DetectiveGame } from '@models/entities/game/detective-game';
import { socketGamePartialUpdateEventMapAsync } from '@reducers/socket-game/actions';
import useAppDispatch from 'src/hook/useAppDispatch';
import useAppSelector from 'src/hook/useAppSelector';

const AddCoreButton = () => {
  const dispatch = useAppDispatch();

  const { game } = useAppSelector((state) => state.socketGame);
  const { params } = game as DetectiveGame;
  const { eventMap, leftCoreList, rightCoreList } = params!;

  const addCore = () => {
    const allCoreList = [20, 21, 22, 23, 25, 26, 27, 28];
    allCoreList.forEach((core) => {
      const isLost =
        !leftCoreList.includes(core) &&
        !rightCoreList.includes(core) &&
        !checkOrderState(eventMap, core);
      if (isLost) {
        const [x, y] = findRandomEmptyPosition(eventMap);
        core &&
          dispatch(
            socketGamePartialUpdateEventMapAsync({ x, y, stateNumber: core }),
          );
      }
    });
  };

  return (
    <article className='viewer-info-board__add-core-btn'>
      <a className='btn' onClick={addCore}>
        補充核心
      </a>
    </article>
  );
};

export default AddCoreButton;
