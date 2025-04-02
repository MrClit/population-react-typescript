import {QueryClient} from "@tanstack/react-query";
import {ApiResponseItem, ContinentPopulationItem, CountryPopulationItem, PopulationData} from "./types.ts";

const BASE_URL = 'https://restcountries.com/v3.1/all?fields=name,continents,population';




export const queryClient = new QueryClient();

export async function fetchPopulation() {
  // Llamada a la API para extraer los datos completos
  const response = await fetch(BASE_URL);

  // Devolvemos error si la respuesta en NO OK
  if (!response.ok) {
    throw new Error('Failed to fetch population data');
  }

  // Si es OK, extraemos los datos
  const resData = await response.json() as ApiResponseItem[];

  // Formatamos y ordenamos los datos por country
  const populationByCountry = resData
    .map(item => ({
        country: item.name.common,
        continent: item.continents[0],
        population: item.population,
      }) as CountryPopulationItem
    )
    .sort((a, b) => b.population - a.population);

  // Lista de continents disponibles en los datos
  const continentsList = [...new Set(populationByCountry.map(item => item.continent))]

  // Función para calcular la población por continente
  function calcPopulationByContinent(): ContinentPopulationItem[] {
    const populationMap = new Map<string, number>();

    // Agregar la población por continentes en el Map
    populationByCountry.forEach(item => {
      const currentPopulation = populationMap.get(item.continent) || 0;
      populationMap.set(item.continent, currentPopulation + item.population);
    })

    // Convertir el Map a un array de objetos tipo DataTable
    const populationArray = Array.from(populationMap, ([continent, totalPopulation]) => ({
        continent: continent,
        population: totalPopulation
      }) as ContinentPopulationItem
    );

    // Ordenar por población en orden descendente
    return populationArray.sort((a, b) => b.population - a.population);
  }

  const populationByContinent = calcPopulationByContinent();

  // Devolvemos el objeto con los todos los datos que vamos a usar
  return {
    continentsList,
    populationByCountry: [...populationByCountry],
    populationByContinent
  } as PopulationData;
}