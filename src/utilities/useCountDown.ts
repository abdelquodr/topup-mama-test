import { useEffect, useState } from 'react';
import AuthService from './authService'

const useCountdown = (minutes: number, seconds: number) => {

  const [min, setMin] = useState(minutes)
  const  [ sec, setSec] = useState(seconds)

  const timer = setTimeout(() =>{
    if(sec > 0){
      setSec(sec => sec - 1)
    }else if(sec === 0) {
      setMin( min => min - 1)
      setSec(59)
    }

  }, 1000)

  const runTimer = () => timer

  console.log(min , sec)

  useEffect(() => {
    if( min === 0 && sec === 0 ){
      clearTimeout(timer)
      AuthService.logout()
      return
    }

    runTimer()
  }, [sec, min])


  return `${convertDigit(min)}:${convertDigit(sec)}`
};

const convertDigit = (digit: number) => {
  return digit > 9 ? digit : "0" + digit
}


export { useCountdown };