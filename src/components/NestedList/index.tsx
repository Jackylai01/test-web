import { NestedList } from '@models/entities/shared/data';

type Props = { nestedList: NestedList };

const NestedList = ({ nestedList }: Props) => {
  return (
    <ol className='order-list'>
      {nestedList.map(({ label, child }, index) => (
        <li
          key={index}
          style={{ textIndent: label['0'] === '(' ? '-1.7em' : '-1.2em' }}
        >
          {label}
          {child ? <NestedList nestedList={child} key={index} /> : null}
        </li>
      ))}
    </ol>
  );
};

export default NestedList;
