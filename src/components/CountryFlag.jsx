import ReactCountryFlag from "react-country-flag";

const emojiToCountryCode = (emoji) => {
  if (emoji?.length !== 4) {
    return null; // Not a valid country flag emoji
  }

  const firstCodePoint = emoji.codePointAt(0) - 0x1F1E6;
  const secondCodePoint = emoji.codePointAt(2) - 0x1F1E6;

  const firstChar = String.fromCharCode(0x41 + firstCodePoint);
  const secondChar = String.fromCharCode(0x41 + secondCodePoint);
console.log(firstChar , secondChar)
  return firstChar + secondChar;
};

export default function CountryFlag({ emoji ,cityName, style}) {
  const countryCode = emojiToCountryCode(emoji);
  return <>
         {countryCode ? (
           <div>
             <ReactCountryFlag
               countryCode={countryCode}
               svg
               style={{
                 width: "4em",
                 height: "4em",
                 borderRadius: "8px",
                 lineHeight:1,
                  ...style
               }}
               title={cityName}
             />
           </div>
         ) : (
           <span>No valid flag emoji</span>
         )}
  </>;
}
