import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  type  ChartData,
  Tooltip,
  Legend,
} from 'chart.js';
import React, { useEffect, useState } from 'react';
import {useMQTTConnect,useMQTTSubscribe} from './usemqtt';
import axios from 'axios';


export const options = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: '',
      },
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
      },
     
    },
  };

export const MyLine = ({title, label}:{title:string, label:string}) => {
  const [aceleraciones, setAceleraciones] = useState([] as number[][]);
  const [isRegistered, setIsRegistered] = useState(false);

  const {mqttClient,isConnected} = useMQTTConnect();
  const aceleracion = useMQTTSubscribe(mqttClient,isConnected,label);
  useEffect(() => {
      
    if (aceleracion !== undefined) {
      const aceleracionArray = JSON.parse(aceleracion.data);
      if (aceleraciones.length >=60) {
        return setAceleraciones((prev) => [...prev.slice(1), aceleracionArray]);
      }
      return setAceleraciones((prev) => [...prev, aceleracionArray]);
    }
  }, [aceleracion]);

const start= async() =>{
  if(localStorage.getItem('isLoggedIn') !== 'true' )
    {window.location.href = '/';}
   const {data} = await axios.get(`http://localhost:3000/latest/${label}`);
    setAceleraciones(data.map((mensaje:any )=>{
      return [mensaje.data.at(0),mensaje.data.at(1),mensaje.data.at(2)];
    }));

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
      );
    setIsRegistered(true);
}

  useEffect(() => { 
    start();
  }, []);

  if (!isRegistered) return <></>;

  
 return (
    <div className='bg-white w-[30rem] h-[18rem] rounded'>
    <h1 className='text-center text-2xl font-bold'>{
      title

}</h1>
    <div className='w-[30rem] h-[15rem]' style={{ marginBottom:"1%", padding:"1%"}}>
    <Line
      onLoad={() => console.log('loaded')}
      data={{
        labels: Array.from({ length: 60 }, (_, i) => i.toString()),
        datasets: [
          {
            data: aceleraciones.map((aceleracion) => aceleracion[0]),
            label: 'x',
            borderColor: '#3e95cd',
            fill: false,
          },
          {
            data: aceleraciones.map((aceleracion) => aceleracion[1]),
            label: 'y',
            borderColor: '#8e5ea2',
            fill: false,
          },
          {
            data: aceleraciones.map((aceleracion) => aceleracion[2]),
            label: 'z',
            borderColor: '#3cba9f',
            fill: false,
          },
       
        ],
      }}
      options={{

        maintainAspectRatio: false,
        aspectRatio: 2,
    ...options 
       }}   
    />
    </div>  
    </div>
  );
};
