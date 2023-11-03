import { isNullOrEmpty, isObject } from './utils';

export function formatQueryString(url: string, ...args: any[]) {
  if (args.length === 0) return url;

  const [query] = args;
  if (isObject(query)) {
    const params: string[] = [];

    for (const name of Object.keys(query)) {
      if (isNullOrEmpty(query[name])) {
        continue;
      }
      params.push(`${name}=${query[name]}`);
    }

    if (params.length === 0) return url;

    return `${url}?${params.join('&')}`;
  }

  return [url, ...args].join('/');
}
