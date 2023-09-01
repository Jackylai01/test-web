import { formatQueryString } from '@helpers/query';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

const FormSearch = () => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const { asPath } = router;

  const onSubmit = (data: any) => {
    const url = asPath.split('?')[0];
    const routerLink = formatQueryString(url, data);
    router.push(routerLink);
  };

  return (
    <form className='container__form' onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor='search'>
        <b>關鍵字搜尋</b>
        <input
          type='text'
          id='search'
          placeholder='請輸入關鍵字'
          {...register('keyword')}
          defaultValue={router.query.keyword}
        />
      </label>
      <button type='submit'>查詢</button>
    </form>
  );
};

export default FormSearch;
