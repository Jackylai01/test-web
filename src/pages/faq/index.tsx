import { faqList } from '@fixtures/faq';
import { NextPage } from 'next';

const QuestionPage: NextPage = () => {
  return (
    <>
      <article className='main__horizontal'>
        <main className='faq'>
          <ul className='faq__list'>
            {faqList.map(({ question, answer }) => (
              <li key={question}>
                <h3 className='faq__list-title'>{question}</h3>
                {answer}
              </li>
            ))}
          </ul>
        </main>
      </article>
    </>
  );
};

export default QuestionPage;
