/* eslint-disable @next/next/no-img-element */
import generateUUID from '@helpers/generate-uuid';
import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import { fileSelectReset, setSelectActive } from '@reducers/file-select';
import { useEffect, useMemo } from 'react';
import { ElementProps } from '..';
import { getFileUrl } from '../../../../helpers/archive';

const SelectImage = ({ element, isEdit }: ElementProps) => {
  const dispatch = useAppDispatch();

  const name = useMemo(() => generateUUID(), []);

  const { fileUrl, fieldName } = useAppSelector((store) => store.fileSelect);

  useEffect(() => {
    if (fileUrl && fieldName === name) {
      element.src = fileUrl;
      dispatch(fileSelectReset());
    }
  }, [dispatch, element, fieldName, fileUrl, name]);

  if (!isEdit)
    return (
      <img
        src={getFileUrl(element.src)}
        alt={element.alt ?? `圖片網址：${element.src}`}
      />
    );
  return (
    <img
      className='select-img'
      style={{ cursor: 'pointer' }}
      src={getFileUrl(element.src)}
      alt='說明文字'
      onDrag={(e) => e.preventDefault()}
      onClick={() => {
        dispatch(
          setSelectActive({
            active: true,
            fieldName: name,
            fileType: 'IMAGE',
          }),
        );
      }}
    />
  );
};

export default SelectImage;
