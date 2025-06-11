import { useEffect, useState } from 'react'
import styles from './Map.module.css'
import {  useNavigate } from 'react-router-dom'
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet'
import { useCities } from '../contexts/CitiesContext'
import CountryFlag from './CountryFlag'
import { useGeolocation } from '../hooks/useGeolocation'
import Button from './Button'
import { useUrlPosition } from '../hooks/useUrlPosition'
export default function Map() {
  const {lat,lng} = useUrlPosition()
  const {cities} = useCities()
  const [mapPosition,setMapPosition] = useState([40,0])
  const {isLoading:isLoadingPosition , position:geolocationPosition , getPosition} = useGeolocation()






    useEffect(function(){
    if(lat && lng){
      setMapPosition([lat,lng])
    }},[lat,lng]) 

    useEffect(function(){
      if(geolocationPosition) setMapPosition([geolocationPosition.lat,geolocationPosition.lng])
    },[geolocationPosition])

  return (
    <div className={styles.mapContainer}>
{     !geolocationPosition&& <Button type={"position"} onClick={getPosition}>
        {isLoadingPosition ? "LOADING..." : "USE YOUR POSITION"} 
      </Button>}
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <CountryFlag
                emoji={city.emoji}
                cityName={city.cityName}
                style={{ height: "3em", borderRadius: "3px" }}
              />
              {city.cityName}
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({position}){
  const map = useMap()
  map.setView(position)
  return null
}
function DetectClick (){
  const navigate = useNavigate()
  useMapEvents({click: e=> navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)})
  return null
}
