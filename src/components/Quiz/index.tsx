import { Quiz } from '@models/entities/record/record';

type Props = {
  index: number;
  quiz: Quiz;
};

const QuizItem = ({
  index,
  quiz: { question, options, correctAnswer, leftAnswer, explanation, type },
}: Props) => {
  return (
    <>
      <h1 className='quiz-box__item-header'>
        {index + 1}.{question}
      </h1>
      <section className='quiz-box__item-container'>
        {options.map(({ no, option }) => (
          <p
            key={no}
            className={`${
              leftAnswer === no && correctAnswer === leftAnswer ? 'pass' : ''
            }${
              leftAnswer === no && correctAnswer !== leftAnswer
                ? 'not-pass'
                : ''
            }`}
          >
            {type === '是非'
              ? option
              : `${['', 'A', 'B', 'C', 'D'][no]}.${option}`}
            {no === correctAnswer ? ' (正確答案)' : ''}
          </p>
        ))}
        {explanation
          ? explanation
              .split('\n')
              .map((line, i) => (
                <p key={i}>{i === 0 ? `解釋：${line}` : line}</p>
              ))
          : null}
      </section>
    </>
  );
};

export default QuizItem;
