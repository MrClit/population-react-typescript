import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {fetchPopulation} from "../utils/http.js";
import Filter from "../components/Filter.jsx";
import {useState} from "react";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import ErrorPage from "./Error.jsx";
import ChartView from "../components/ChartView.jsx";
import {OutputPopulationItem} from "../utils/types.ts";

export default function RegionPage() {
  const params = useParams<{ region: string }>();

  // Tanstack Query para garantizar que solo se llama a la api una vez
  const {data, isLoading, isError} = useQuery({
    queryKey: ['population'],
    queryFn: fetchPopulation,
  })

  const [minValue, setMinValue] = useState(0);

  let title: string = "";
  let selectedData: OutputPopulationItem[] = [];
  let isRegionValid: boolean = false;
  let filteredData: OutputPopulationItem[] = [];

  // Seleccionamos los datos en función del parámetro de la ruta
  if (data && !isError && params.region !== undefined) {
    isRegionValid = data.continentsList.includes(params.region) || params.region === 'global';
    if (isRegionValid) {
      if (params.region === 'global') {
        title = 'Global Population by Continent';
        selectedData = data.populationByContinent.map(item => {
          return {
            name: item.continent,
            population: item.population,
          }
        })
      } else {
        title = `${params.region} Population by Country`;
        selectedData = data.populationByCountry
          .filter(item => item.continent === params.region)
          .map(item => {
            return {
              name: item.country,
              population: item.population,
            }
          })
      }
    }

    // Filtramos los datos seleccionamos en base el mínimo de población
    if (minValue > 0) {
      filteredData = selectedData.filter(item => item.population >= minValue)
    } else {
      filteredData = selectedData;
    }
  }

  return (
    <div className="region-container">
      <h1>{title}</h1>
      {isLoading && <LoadingIndicator/>}
      {isError && <ErrorBlock title="An error ocurred" message="Failed to fetch population"/>}
      {!isRegionValid && <ErrorPage/>}
      {data && !isError && isRegionValid && (
        <>
          <Filter min={setMinValue}/>
          <ChartView data={filteredData}/>
        </>
      )}
    </div>
  )
}