import styles from "./CityItem.module.css"
import { Link } from "react-router-dom"
import { useCities } from "../contexts/CitiesContext"
import CountryFlag from "./CountryFlag"

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date))

export default function CityItem({ city }) {
  const {
    cityName,
    emoji,
    date,
    id,
    position: { lat, lng },
  } = city
  const { currentCity , deleteCity } = useCities()

  function handleDelete (e){
    e.preventDefault()
      deleteCity(id)
  
  }

  return (
    <li className={styles.cityItemContainer}>
      <Link
        className={`${styles.cityItem} ${currentCity.id === id ? styles["cityItem--active"] : ""}`}
        to={`${id}?lat=${lat}&lng=${lng}`}
      >
        <CountryFlag emoji={emoji} cityName={cityName} style={{ width: "4rem", height: "3rem" }} />
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn} onClick={handleDelete}>&times;</button>
      </Link>
    </li>
  )
}
