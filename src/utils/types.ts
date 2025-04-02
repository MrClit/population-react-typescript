export type ApiResponseItem = {
  name: {
    common: string;
  };
  continents: string[];
  population: number;
}

export type CountryPopulationItem = {
  country: string;
  continent: string;
  population: number;
}

export type ContinentPopulationItem = {
  continent: string;
  population: number;
}

export type PopulationData = {
  continentsList: string[];
  populationByCountry: CountryPopulationItem[];
  populationByContinent: ContinentPopulationItem[];
}

export type OutputPopulationItem = {
  name: string;
  population: number;
}