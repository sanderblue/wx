export function parseQueryParams(queryParams: URLSearchParams): any {
  const p = {};

  queryParams.forEach((value, key) => {
    p[key] = value;
  });

  return p;
}

// interface ParsedOutput {
//   data: string;
//   error: Error | null;
// }

export function parseJSON<T>(json: string, fallbackReturn: T): T {
  try {
    return JSON.parse(json);
  } catch (error) {
    console.warn('Failed to parse JSON, returning fallback data.');

    return fallbackReturn;
  }
}
