import { createContext, useContext, useEffect, useState } from "react";
const BASE_URL = "http://localhost:8000"

const CitiesContext = createContext()

function CitiesProvider({children}){


  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});
  
    useEffect(function(){
      async function fetchCities() {
          try{   setIsLoading(true);
        const response = await fetch(`${BASE_URL}/cities`);
        const data = await response.json();
        setCities(data);}
        catch{
          alert("Error fetching cities");
        }
        finally{
          setIsLoading(false);
        }
      }

      fetchCities();
    },[setCities]);


 async function getCity(id) {
          try{   setIsLoading(true);
        const response = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await response.json();
        setCurrentCity(data);}
        catch{
          alert("Error fetching cities");
        }
        finally{
          setIsLoading(false);
        }
      }

 async function createCity(newCity) {
          try{   setIsLoading(true);
        const response = await fetch(`${BASE_URL}/cities`,{method:'POST',
          body:JSON.stringify(newCity),
          headers:{
            'Content-Type':'application/json'
          }
        });
        const data = await response.json();
        setCities((cities)=>[...cities,data])
      }
        catch{
          alert("Error in creating city");
        }
        finally{
          setIsLoading(false);
        }
      }

  async function deleteCity(id) {
          try{   setIsLoading(true);
         await fetch(`${BASE_URL}/cities/${id}`,{method:'DELETE',
          
        });
       
        setCities((cities)=>cities.filter((city)=>city.id !== id))
      }
        catch{
          alert("Error deleting city");
        }
        finally{
          setIsLoading(false);
        }
      }

  return<CitiesContext.Provider value={{cities,isLoading,currentCity,getCity,createCity, deleteCity}}>

    {children}
  </CitiesContext.Provider>
}

function useCities(){
  const context = useContext(CitiesContext)
  if(!context){
    throw new Error("useCities must be used within a CitiesProvider")
  }
  return context
}
// eslint-disable-next-line react-refresh/only-export-components
export {CitiesProvider, useCities}