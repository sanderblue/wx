import { gql } from 'apollo-boost';

export const GET_WEATHER_STATIONS = gql`
  query weatherStations($query: String!) {
    weatherStations(query: $query) {
      location
    }
  }
`;
