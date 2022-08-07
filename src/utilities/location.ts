import axios from 'axios';

export const getLocation =  () => {
   const locate = async() => {
      return await axios.get('http://ip-api.com/json')
   }

  return locate()
}



// Google did not work because of API key key
// API  key  require atm card

const reverseGeocodingWithGoogle = (latitude: any, longitude: any) => {
  fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key`)
  .then( res => res.json())
  .then(response => {
      console.log("User's Location Info: ", response)
   })
   .catch(status => {
      console.log('Request failed.  Returned status of', status)
   })
}

export const geoFindUser = () => {
    if (!navigator.geolocation){
      console.log("Geolocation is not supported by your browser");
      return;
    }

    const success = (position: { coords: { latitude: any; longitude: any; }; }) => {
      var latitude  = position.coords.latitude;
      var longitude = position.coords.longitude;
      reverseGeocodingWithGoogle(latitude, longitude)
    }

    const error = () => {
      console.log("Unable to retrieve your location");
    }


    navigator.geolocation.getCurrentPosition(success, error);
  }