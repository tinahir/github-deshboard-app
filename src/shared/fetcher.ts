export const fetcher = (url: string) => {
  return fetch(url).then((r) => r.json());
};
