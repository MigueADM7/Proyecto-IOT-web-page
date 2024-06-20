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

export const Button = () => {
  const [isactivate, setIsactivate] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const {mqttClient,isConnected} = useMQTTConnect();
  const butones = useMQTTSubscribe(mqttClient,isConnected,"alarma");
  const publicar = async() => {
    await mqttClient?.publish('alarma', JSON.stringify(!isactivate));
  }
  useEffect(() => {
      
    if (butones !== undefined) {
      const data = JSON.parse(butones.data);
      console.log(data);
      return setIsactivate((prev) => data);
    }
  }, [butones]);

const start= async() =>{
  if(localStorage.getItem('isLoggedIn') !== 'true' )
    {window.location.href = '/';}
   const {data} = await axios.get(`http://localhost:3000/uniquelatest/alarma`);
   //console.log(data ?? false);
   setIsactivate(data.data);

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
        "Alarma"

}</h1>
    <div className='w-[30rem] h-[15rem] flex content-center
        justify-center 
        items-center
        ' style={{ marginBottom:"1%", padding:"1%"}}>
   <button onClick={publicar} className={` ${
     isactivate? "bg-green-400 hover:bg-green-700" : "bg-red-500 hover:bg-red-700"
    } text-white
        
     font-bold py-2 px-4 rounded-full w-28 h-28`}>
    {isactivate ?  "Activar":"Desactivar" }
   </button>
    </div>  
    </div>
  );
};
