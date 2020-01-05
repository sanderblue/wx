import { gql } from 'apollo-boost';

export const GET_OBSERVATIONS = gql`
  query getObservations($locations: [String!]!) {
    observations(locations: $locations) {
      location
      date
      averageSnowDepthForDate
    }
  }
`;

export const GET_WEATHER_STATIONS = gql`
  query getWeatherStations() {
    weatherStations {
      location
    }
  }
`;
