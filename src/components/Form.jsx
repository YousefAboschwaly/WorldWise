// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Spinner from "./Spinner";
import CountryFlag from "./CountryFlag";
import Message from "./Message";
const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client"
// eslint-disable-next-line react-refresh/only-export-components
export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
    const {lat,lng} = useUrlPosition()
    
  
  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [emoji, setEmoji] = useState("");
  const [geoCodingError, setGeoCodingError] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");

  useEffect(function(){
    async function fetchCityData() {
        try{
          setIsLoadingGeoCoding(true);
          const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`)
          const data = await res.json();
          if(!data.countryCode){
            throw new Error (" That doesn't seem to be a city. click somewhere else on the map 😉")
          }
          setCityName(data.city || data.locality || "");
          setCountry(data.countryName );
          setEmoji(convertToEmoji(data.countryCode))
          setGeoCodingError("");
          console.log(data)
        }
        catch (err) {
       setGeoCodingError(err.message);     
         }
        finally{
          setIsLoadingGeoCoding(false);
        }
    }
    fetchCityData()
  },[lat,lng])


  if(isLoadingGeoCoding){
    return <Spinner/>
  }
  if(geoCodingError){
    return <Message message={geoCodingError}/>
  }

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
      <span className={styles.flag}> <CountryFlag emoji={emoji} country={country} style={{height:"3rem" , width:'full' ,borderRadius: "4px",}}  /> </span> 
        {/* <span className={styles.flag}>{emoji}</span> */}
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type={"primary"}>Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
