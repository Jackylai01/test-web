import { S3_STORAGE_URL } from '../../../fixtures/constants';
import { ApiResult, postRequest, pureApiRequest } from '../../shared/api';

/**
 * 後台-檔案上傳
 * @throws 400 BadRequest 欄位驗證錯誤
 */
export const apiAdminUpload = async (file: File) => {
  const body = {
    fileName: file.name,
    fileSize: file.size,
  };
  const response = await postRequest<
    ApiResult<{
      _id: string;
      key: string;
      url: string;
      src: string;
    }>
  >('/zigong/upload', body);
  const { result, error: uploadError } = response;
  if (!result) {
    throw uploadError;
  }
  await pureApiRequest.put(`${result?.data.url}`, file, {
    headers: { 'Content-Type': file.type },
  });
  await postRequest(`/zigong/upload/${result?.data._id}`);
  result.data.src = `${S3_STORAGE_URL}/${result.data.key}`;
  return response;
};
