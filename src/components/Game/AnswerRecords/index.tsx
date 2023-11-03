import ContainerBoard from '@components/ContainerBoard';
import { DetectiveGame } from '@models/entities/game/detective-game';
import { GameModalType, setGameModalType } from '@reducers/game';
import useAppDispatch from 'src/hook/useAppDispatch';
import useAppSelector from 'src/hook/useAppSelector';

const AnswerRecords = () => {
  const dispatch = useAppDispatch();

  const { game, side } = useAppSelector((state) => state.socketGame);
  const { quizList } = game as DetectiveGame;

  return (
    <article
      style={{ padding: '10%' }}
      onClick={() => dispatch(setGameModalType(GameModalType.遊戲結果))}
    >
      <ContainerBoard title='答題回顧'>
        <ul className='question-records'>
          {quizList
            .filter(
              (record) => !!record[`${side}UserId`] && record[`${side}Answer`],
            )
            .map((record, index) => (
              <li key={index}>
                <h4>{record.question}</h4>
                <h5 className='text-auxiliary--light'>{record.category}</h5>
                <span>
                  選項：
                  {record.options.map((option) => option.option).join('、')}
                </span>
                <span>
                  正解：
                  {
                    record.options.find(
                      (option) => option.no === record.correctAnswer,
                    )?.option
                  }
                </span>
                <span
                  style={{
                    color:
                      record[`${side}Answer`] === record.correctAnswer
                        ? 'green'
                        : 'red',
                  }}
                >
                  回答：
                  {
                    record.options.find(
                      (option) => record[`${side}Answer`] === option.no,
                    )?.option
                  }
                </span>
                <span>解說：{record.explanation}</span>
              </li>
            ))}
        </ul>
      </ContainerBoard>
    </article>
  );
};

export default AnswerRecords;
