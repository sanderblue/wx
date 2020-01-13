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

export function addLocationToQuery(location: string): URLSearchParams {
  const queryP = new URLSearchParams(window.location.search);
  const locations = parseJSON<string[]>(queryP.get('query'), []);

  if (!locations.includes(location)) {
    locations.push(location);
  }

  queryP.set('query', JSON.stringify(locations));

  return queryP;
}

export function removeLocationFromQuery(
  queryString: string,
  location: string,
): URLSearchParams {
  const qp = new URLSearchParams(queryString);
  const parsed = parseQueryParams(qp);
  const locations = parseJSON<string[]>(parsed.query, []).filter((loc) => {
    return location !== loc;
  });

  if (!locations.length) {
    qp.delete('query');

    return qp;
  }

  qp.set('query', JSON.stringify(locations));

  return qp;
}

export function getLocationsFromQueryString(queryString: string): string[] {
  const parsed = parseQueryParams(new URLSearchParams(queryString));

  return parseJSON<string[]>(parsed.query, []);
}
