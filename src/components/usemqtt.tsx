import { useEffect, useState,useRef } from "react";
import mqtt, { type MqttClient } from 'mqtt'
import axios from 'axios';





export function useMQTTConnect() {
    const mqttClient = useRef<MqttClient | null>(null);
  const [isConnected, setIsConnected] = useState(false);
    useEffect(() => {
        
      mqttClient.current = mqtt.connect('mqtt://localhost:4000');
        mqttClient.current?.on('connect', function () {
          console.log('Conectado al broker MQTT');
          setIsConnected(true);
          // Realiza acciones después de la conexión aquí
        });
      
        mqttClient.current?.on('error', function (error:any) {
          console.error('Error en la conexión:', error);
        });
      }, []);

      return {mqttClient:mqttClient.current,isConnected} as {mqttClient: MqttClient|null, isConnected: boolean};
  
       
  }

  export const useMQTTSubscribe = (mqttClient: MqttClient|null, isConnected: boolean ,topic:string) => {
    const [message, setMessage] = useState<{
      data: string;
      topic: string;
      time: Date;
    }|undefined>();
   
     useEffect(() => {
    if(isConnected){
      console.log('Subscribiendo a:', topic);
      mqttClient?.subscribe(topic);
      mqttClient?.on('message', function (topic, message) {
        console.log('Mensaje recibido:', topic, message);
        setMessage({
          data: message.toString(),
          topic: topic,
          time: new Date(),
        });
      });
    }
    
    }, [isConnected]);

    return message;

  }

  export const xd= (mqttClient: MqttClient|null, isConnected: boolean,topic:string, message:string) => {}
