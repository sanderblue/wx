import { ObjectLiteral } from '@wx/shared/data';

export function parseQueryParams(queryParams: URLSearchParams): ObjectLiteral {
  const p = {};

  queryParams.forEach((value, key) => {
    p[key] = value;
  });

  return p;
}

export function parseJSON<T>(json: string, fallbackReturn: T): T {
  try {
    const result = JSON.parse(json);

    return result ? result : fallbackReturn;
  } catch (error) {
    console.warn('Failed to parse JSON, returning fallback data.');

    return fallbackReturn;
  }
}

export function buildQuery(q: ObjectLiteral): URLSearchParams {
  const query = new URLSearchParams();

  for (const [key, value] of Object.entries(q)) {
    query.set(key, JSON.stringify(value));
  }

  return query;
}

export function addLocationToQuery(location: string): URLSearchParams {
  const queryP = new URLSearchParams(window.location.search);
  const locations = parseJSON<string[]>(queryP.get('locations'), []);

  if (!locations.includes(location)) {
    locations.push(location);
  }

  queryP.set('locations', JSON.stringify(locations));

  return queryP;
}

export function removeLocationFromQuery(
  queryString: string,
  location: string,
): URLSearchParams {
  const qp = new URLSearchParams(queryString);
  const parsed = parseQueryParams(qp);
  const locations = parseJSON<string[]>(parsed.locations, []).filter((loc) => {
    return location !== loc;
  });

  if (!locations.length) {
    qp.delete('locations');

    return qp;
  }

  qp.set('locations', JSON.stringify(locations));

  const qpAfter = new URLSearchParams(qp.toString());
  const parsedAfter = parseQueryParams(qpAfter);

  console.log(`Removed Location '${location}':`, parsedAfter);

  return qp;
}

export function getLocationsFromQueryString(queryString: string): string[] {
  const parsed = parseQueryParams(new URLSearchParams(queryString));

  return parseJSON<string[]>(parsed.locations, []);
}

export function parseQueryString(qs: string): ObjectLiteral {
  const parsed = parseQueryParams(new URLSearchParams(qs));

  const locations = parseJSON<string[]>(parsed.locations, []);

  return {
    locations,
    startDate: parsed.startDate,
    endDate: parsed.endDate,
  };
}

export function buildQueryParams(items: ObjectLiteral) {
  const qp = new URLSearchParams();

  for (const [key, value] of Object.entries(items)) {
    if (value instanceof Array) {
      qp.set(key, JSON.stringify(value));
    } else {
      qp.set(key, value);
    }
  }

  return qp;
}
