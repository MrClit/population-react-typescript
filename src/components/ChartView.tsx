import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, type ChartOptions} from 'chart.js';
import {Bar} from 'react-chartjs-2';
import classes from './ChartView.module.css';
import {OutputPopulationItem} from "../utils/types.ts";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type ChartViewProps = {
  data: OutputPopulationItem[];
}

export default function ChartView({data}:ChartViewProps) {

  const options: ChartOptions<'bar'> = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false, // Permitir que el gráfico se adapte al contenedor
    plugins: {
      legend: {position: 'top'},
      title: {display: false, text: 'Population by region'},
      tooltip: {
        enabled: true
      }
    }
  };

  const chartData = {
    labels: data.map(item => item.name),
    datasets: [{
      label: 'Population',
      data: data.map(item => item.population),
      backgroundColor: '#1abc9c',
      borderColor: '#1abc9c',
      borderWidth: 1
    }]
  };


  return (
    <div className={classes['chart-container']}>
      <Bar
        options={options}
        data={chartData}
        className={classes['chart-canvas']}
      />
    </div>
  )
}