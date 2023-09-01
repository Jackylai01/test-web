import { dotKeysValue } from '@helpers/object';
import { useEffect, useRef, useState } from 'react';
import { InnerProps } from '..';

const Tags = ({
  getValues,
  setValue,
  formState: { errors },
  fieldConfig: { name, label, required, col },
}: InnerProps) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [tabList, setTabList] = useState<string[]>([]);
  const tabItems = useRef<HTMLUListElement>(null);
  const defaultValue = getValues(name);

  const createTab = () => {
    if (!inputValue.trim()) {
      setInputValue('');
      return;
    }
    setTabList([...tabList, inputValue]);
    setInputValue('');
  };

  const removeTab = (index: number) => {
    setTabList(tabList.filter((_, i) => index !== i));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      createTab();
    }
  };

  useEffect(() => {
    if (!tabList || !defaultValue) return;
    if (tabList.sort().join('、') === defaultValue.sort().join('、')) return;
    setTabList(defaultValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue]);

  useEffect(() => {
    if (!tabList || !defaultValue) return;
    if (tabList.sort().join('、') === defaultValue.sort().join('、')) return;
    setValue(name, tabList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabList]);

  return (
    <section className={`row__col row__col--${col}`}>
      <label className='form__input' htmlFor={name}>
        <b>
          {required && '* '}
          {label}
        </b>
      </label>
      <blockquote className='form__tab'>
        <ul className='form__tab-items' ref={tabItems}>
          {tabList.map((tab, index) => (
            <li key={index} onClick={() => removeTab(index)}>
              {tab}
              <span className='icomoon-cancel-circle'></span>
            </li>
          ))}
        </ul>
        <input
          id={name}
          type='text'
          placeholder='請輸入標籤名稱並新增'
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          onKeyPress={(event) => handleKeyDown(event)}
          style={{
            paddingLeft: 10 + Number(tabItems.current?.offsetWidth ?? 0),
          }}
        />
        <a className='form__tab-button' onClick={createTab}>
          <span className='icomoon-add'></span>
        </a>
      </blockquote>
      {dotKeysValue(errors, name) && (
        <span className='form__error-message'>
          {dotKeysValue(errors, name)?.message}
        </span>
      )}
    </section>
  );
};

export default Tags;
