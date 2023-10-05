// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import Message from "./Message";
import styles from "./Form.module.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
import { useUrlPosition } from "../Hooks/useUrlPosition";
import Spinner from "./Spinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../contexts/CitiesContext";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}
const  BASE_URL ="https://api.bigdatacloud.net/data/reverse-geocode-client?"

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [lat,lng] = useUrlPosition();
  const [isLoadingGeoCoding,setIsLoadingGeoCoding] = useState();
  const [emoji,setEmoji] = useState();
  const [geoCodingError,setGeoCodingError] = useState();
  const {createCity,isLoading} = useCities();
  const navigate = useNavigate();
  useEffect(()=>{
    async function fetchCityData()
    {
      if(!lat && !lng) return;
      try{
        setIsLoadingGeoCoding(true);
        const response = await fetch(`${BASE_URL}latitude=${lat}&longitude=${lng}`);
        const data = await response.json();
        console.log(data.countryCode);
        if(!data.countryCode) 
        {
    
          throw new Error("This Doesn't seems to be city click Somewhere Else.")
          
      }
        setGeoCodingError("");
        setCityName(data.city || data.locality || "");
        setCountry(data.countryName); 
        setEmoji(convertToEmoji(data.countryCode));

      }catch(err){
          setGeoCodingError(err.message);
          console.log("AYYA");
      }finally{
         setIsLoadingGeoCoding(false);
      }
    }
    fetchCityData();
  },[lat,lng]);
   
  async function handleSubmit(e)
  {
    e.preventDefault();
    if(!cityName || !date) return;
    const  newCity = {
      cityName,
      emoji,
      country,
      date,
      notes,
      position: {
        lat,
        lng,
      }
    }
    await createCity(newCity);
    navigate("/app/cities");

  }

  if(!lat && !lng) return <Message message='Start By Clicking anywhere on the Map' />
 if(isLoadingGeoCoding) return <Spinner />
 if(geoCodingError) return <Message message={geoCodingError}/>

  return (
    <form className={`${styles.form} ${isLoading?styles.loading:""}`} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker 
        selected={date} 
        onChange={(date)=>{setDate(date)}} 
        dateFormat="dd/MM/yyyy"  
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
