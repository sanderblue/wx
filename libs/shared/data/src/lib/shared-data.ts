import ApexAxisChartSeries from 'apexcharts';

export interface AppState {
  location: string;
  locations: string[];
  startDate: string;
  endDate: string;
}

export interface SnowDepthObservationDaily {
  id: number;
  location: string;
  date: string;
  timestamp: number;
  elevation: number;
  averageSnowDepthForDate: number;
  hourlyObservations: number[];
}

export interface SnowDepthObservationHourly {
  id?: number;
  location: string;
  date: string;
  timestamp: number;
  elevation: number;
  snowDepth: number;
}

export interface SeasonsData {
  [key: string]: {
    startDate: Date;
    endDate: Date;
    series: ApexAxisChartSeries;
  };
}

export interface ObjectLiteral {
  [key: string]: any;
}

export interface MapStringBoolean {
  [key: string]: boolean;
}

export interface MapStringString {
  [key: string]: string;
}

export interface MapStringArray {
  [key: string]: any[];
}

export interface WxStation {
  location: string;
}

export interface WxStations {
  weatherStations: WxStation[];
}

export const weatherStations = [
  {
    location: 'MtBakerHeatherMeadows',
    latitude: 48.8569731,
    longitude: -121.6761533,
    elevation: 4210,
  },
  {
    location: 'CrystalBase',
    latitude: 46.9308932,
    longitude: -121.5017771,
    elevation: 5940,
  },
  {
    location: 'CrystalCampbellBasin',
    latitude: 46.9251096,
    longitude: -121.4993777,
    elevation: 5940,
  },
  {
    location: 'CrystalGreenValley',
    latitude: 46.9396226,
    longitude: -121.4963637,
    elevation: 6230,
  },
  {
    location: 'SkibowlSummit',
    latitude: 45.2886548,
    longitude: -121.7852937,
    elevation: 5010,
  },
  {
    location: 'MtHoodMeadowsBase',
    latitude: 45.331759,
    longitude: -121.6673735,
    elevation: 5380,
  },
  {
    location: 'TimberlineLodge',
    latitude: 45.3311345,
    longitude: -121.7131958,
    elevation: 6000,
  },
];

export const locationColorMap = {
  TimberlineLodge: '#2E93fA',
  MtHoodMeadowsBase: '#66DA26',
  MtBakerHeatherMeadows: '#546E7A',
  CrystalBase: '#F23E7A',
  CrystalCampbellBasin: '#FF9800',
  CrystalGreenValley: '#c987e6',
  SkibowlSummit: '#ffff66',
};
