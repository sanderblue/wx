export function parseQueryParams(
  queryParams: URLSearchParams,
): { [key: string]: any } {
  const p = {};

  queryParams.forEach((value, key) => {
    p[key] = value;
  });

  return p;
}

export function parseJSON<T>(json: string, fallbackReturn: T): T {
  try {
    const result = JSON.parse(json);

    console.log('RESULT:', result);

    return result ? result : fallbackReturn;
  } catch (error) {
    console.warn('Failed to parse JSON, returning fallback data.');

    return fallbackReturn;
  }
}
