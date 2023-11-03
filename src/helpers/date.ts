/**
 * Format date to yyyy/MM/dd
 *
 * @param {Date|string} value - A Date or a date string
 * @return {string} A yyyy/MM/dd string
 *
 * @example
 *
 *     formatDisplayDate('2022-1-1'): '2022/01/01'
 */
export const formatDisplayDate = (value: Date | string): string => {
  const date = new Date(value);
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${year}/${month}/${day}`;
};

/**
 * Format date to yyyy年MM月dd日
 *
 * @param {Date|string} value - A Date or a date string
 * @return {string} A yyyy年MM月dd日 string
 *
 * @example
 *
 *     formatDisplayChineseDate('2022-1-1'): '2022年1月1日'
 */
export const formatDisplayChineseDate = (value: Date | string): string => {
  const date = new Date(value);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}年${month}月${day}日`;
};

/**
 * Format date to yyyy年MM月dd日 13:00:02
 *
 * @param {Date|string|number|undefined} value - A Date or a date string or a date number or undefined
 * @return {string} A yyyy年MM月dd日 13:00:02 string
 *
 * @example
 *
 *     formatDisplayChineseDateTime('2022-1-1'): '2022年1月1日 08:00:00'
 */
export const formatDisplayChineseDateTime = (
  value: Date | string | number | undefined,
) => {
  if (value === undefined) return '';

  value = new Date(value);
  const h = value.getHours();
  const m = value.getMinutes();
  const s = value.getSeconds();

  return (
    value.getFullYear() +
    ' 年 ' +
    (value.getMonth() + 1) +
    ' 月 ' +
    value.getDate() +
    ' 日 ' +
    `${h < 10 ? '0' + h : h}:${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`
  );
};

export const fillUpDate = (value: string | number) => {
  return Number(value) >= 10 ? value : `0${value}`;
};

export const defaultDate = (value: Date | string) => {
  return new Date(value)
    .toLocaleDateString()
    .split('/')
    .map((number) => fillUpDate(number))
    .join('-');
};

export const betweenMs = (start: Date | string, end: Date | string) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  return endDate.getTime() - startDate.getTime();
};
