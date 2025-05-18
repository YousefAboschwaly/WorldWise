import styles from "./CountryList.module.css"
import CountryItem from "./CountryItem"
import Spinner from "./Spinner"
import Message from "./Message"
import { useCities } from "../contexts/CitiesContext"

export default function CountryList() {
  const { cities, isLoading } = useCities()

  if (isLoading) {
    return <Spinner />
  }

  if (!cities.length && !isLoading) {
    return <Message message={"Add your first city by clicking on the city on the map "} />
  }

  // Use the original filtration logic from version 1
  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji, id: city.country }]
    else return arr
  }, [])

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.id} />
      ))}
    </ul>
  )
}
