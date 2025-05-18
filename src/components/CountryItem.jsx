import ReactCountryFlag from "react-country-flag"
import styles from "./CountryItem.module.css"
import CountryFlag from "./CountryFlag"



function CountryItem({ country }) {

  return (
    <li className={styles.countryItem}>
          <CountryFlag
          cityName={country.country}
          emoji={country.emoji}
            
            style={{
              width: "4em",
              height: "3em",
              fontSize: '2rem',
              lineHeight: 1
             
            }}
            title={country.country}
          />
      <span>{country.country}</span>
    </li>
  )
}

export default CountryItem
