import { dotKeysValue } from '@helpers/object';
import { useEffect, useMemo, useRef, useState } from 'react';
import { InnerProps } from '..';

const Tags = ({
  getValues,
  setValue,
  setError,
  clearErrors,
  formState: { errors },
  fieldConfig: { name, label, required, col, options },
}: InnerProps) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [tabList, setTabList] = useState<string[]>([]);
  const tabItems = useRef<HTMLUListElement>(null);
  const filedValue = getValues(name);
  const currentValue =
    filedValue && typeof filedValue === 'string'
      ? filedValue.split(',')
      : filedValue;

  const filteredOptions = useMemo(
    () => options?.filter((option) => option.includes(inputValue)),
    [inputValue, options],
  );

  useEffect(() => {
    if (!currentValue?.length || tabList.length) return;
    setTabList(currentValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentValue]);

  useEffect(() => {
    setValue(name, tabList);

    if (required && !tabList.length) {
      setError(name, { type: 'required', message: `${label}為必填欄位` });
    } else {
      clearErrors(name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabList]);

  const inputTab = () => {
    if (!inputValue.trim()) {
      setInputValue('');
      return;
    }
    createTab(inputValue);
    setInputValue('');
  };

  const autoCompleteTab = (value: string) => {
    createTab(value);
    setInputValue('');
  };

  const createTab = (value: string) => {
    if (tabList.includes(value)) return;
    setTabList([...tabList, value]);
  };

  const removeTab = (index: number) => {
    setTabList(tabList.filter((_, i) => index !== i));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      inputTab();
    }
  };

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
              <span className='icomoon-clear'></span>
            </li>
          ))}
        </ul>
        <input
          id={name}
          type='text'
          placeholder={`請輸入${label}並新增`}
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          onKeyPress={(event) => handleKeyDown(event)}
          style={{
            paddingLeft: 10 + Number(tabItems.current?.offsetWidth ?? 0),
          }}
        />
        <a className='form__tab-button' onClick={inputTab}>
          <span className='icomoon-add'></span>
        </a>
      </blockquote>
      {!!filteredOptions?.length && (
        <article className='dropdown'>
          <ul className={`dropdown__container${inputValue ? ' active' : ''}`}>
            {filteredOptions?.map((option, index) => (
              <li key={index} onClick={() => autoCompleteTab(option)}>
                {option}
              </li>
            ))}
          </ul>
        </article>
      )}
      {dotKeysValue(errors, name) && (
        <span className='form__error-message'>
          {dotKeysValue(errors, name)?.message}
        </span>
      )}
    </section>
  );
};

export default Tags;
