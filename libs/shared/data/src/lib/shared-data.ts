export interface SnowDepthObservationDaily {
  id: number;
  location: string;
  date: string;
  timestamp: number;
  elevation: number;
  averageSnowDepthForDate: number;
  hourlyObservations: number[];
}
