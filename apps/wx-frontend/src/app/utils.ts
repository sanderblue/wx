export function parseQueryParams(queryParams: URLSearchParams): any {
  const p = {};

  queryParams.forEach((value, key) => {
    p[key] = value;
  });

  return p;
}
