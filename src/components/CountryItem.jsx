import ReactCountryFlag from "react-country-flag";
import styles from "./CountryItem.module.css";
const emojiToCountryCode = (emoji) => {
  if (emoji.length !== 4) {
    return null; // Not a valid country flag emoji
  }

  const firstCodePoint = emoji.codePointAt(0) - 0x1F1E6;
  const secondCodePoint = emoji.codePointAt(2) - 0x1F1E6;

  const firstChar = String.fromCharCode(0x41 + firstCodePoint);
  const secondChar = String.fromCharCode(0x41 + secondCodePoint);

  return firstChar + secondChar;
};

function CountryItem({ country }) {

  const countryCode = emojiToCountryCode(country.emoji);



  return (
    <li className={styles.countryItem}>
      {countryCode ? (
             <div >
               <ReactCountryFlag
                 countryCode={countryCode}
                 svg
                 style={{
                   width: '3em',
                   height: '3em',
                   borderRadius: '12px',
                 }}
                 title={country.country}
               />
             </div>
           ) : (
             <span>No valid flag emoji</span>
           )}
      <span>{country.country}</span>

    </li>
  );
}

export default CountryItem;
