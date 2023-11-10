import Image from 'next/image'
import { Inter } from 'next/font/google'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCirclePlus} from '@fortawesome/free-solid-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [location,setLocation]=useState('')
  const [weather,setWeather]=useState('')
const getWeather=async()=>{
  const api=`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`
  if(location){
    try{
      const res=await fetch(api)
      const data=await res.json()
      if(data){
        console.log(data)
        const api_data={
          country:data.sys.country,
          city:data.name,
          temp:data.main.temp,
          humidity:data.main.humidity,
          wind:data.wind.speed,
          gust:data.wind.gust,
          visibility:data.visibility,
          condition:data.weather[0].main,
          img:(data.weather[0].icon).png
        }

        setWeather(<>
                      <div className='text-center text-2xl p-2'>{api_data.city}</div>
              <div className='flex justify-center'>
                <div className='flow-root'>
                  <div className='float-left'><Image src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} width='80' height='80' alt='condition'/></div>
                  <div className='float-left text-6xl'>{api_data.temp}</div>
                </div>
              </div>
              <div className='text-center text-gray-600'>{api_data.condition}</div>
              <div className='flow-root p-2'>
                <div className='float-left text-gray-600'>Humidity:{api_data.humidity}%</div>
                <div className='float-right text-gray-600'>Wind:{api_data.wind}mph</div>
                <br/>
                <div className='float-left text-gray-600'>Visibility:{api_data.visibility}mi</div>
                <div className='float-right text-gray-600'>Gust:{api_data.gust}mph</div>
              </div>
        </>)

      }
    }catch(err){
      console.log(err)
    }
  }else{
    //no loaction entered
  }
}
  return (
   <div>
    <nav className='flex items-center justify-center py-4 bg-gray-100 w-full m-0 opacity-90'>
      <div className='relative'>
        <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'><FontAwesomeIcon icon={faCirclePlus} /></div>
      <input className='block bg-slate-700 text-white rounded-lg opacity-70 pl-10 p-2.5'
      type='text'
      id='location'
      value={location}
      onChange={(e)=>{setLocation(e.target.value)}}
      placeholder='Location'/>
      </div>
      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold m-2 p-2.5 rounded-lg' id='search' onClick={getWeather}><FontAwesomeIcon icon={faMagnifyingGlass} />
      <span className='sr-only'>GO</span>
      </button>
 </nav>
 {weather &&
      <div className='flex w-full p-20 justify-center'>
        <div className='w-full max-w-xs'>
          <div className='mb-4'>
            <div className='bg-white shdaow-lg rounded-3xl px-8 pt-6 pb-8 mb-4 opacity-80'>
              {weather}
            </div>
          </div>
        </div>
      </div>
}
   </div>
  )
}
