import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import CityItem from "./CityItem";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";

function CityList() {
  const { cities, isLoading } = useCities();
  console.log(cities);
  if (isLoading) return <Spinner />;
  if (!cities.length) {
    return <Message message={"Add Your First City by CLicking on the map."} />;
  }
  return (
    <div>
      <ul className={styles.cityList}>
        {cities.map((city) => {
          console.log(city, "AUUUUUUUUUUUUUUUU");
          return <CityItem key={city.id} city={city} />;
        })}
      </ul>
    </div>
  );
}

export default CityList;
