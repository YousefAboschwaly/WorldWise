import { useEffect, useState } from 'react'
import styles from './Map.module.css'
import {  useNavigate, useSearchParams } from 'react-router-dom'
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet'
import { useCities } from '../contexts/CitiesContext'
import CountryFlag from './CountryFlag'
export default function Map() {
    const [searchParams] = useSearchParams()
    const {cities} = useCities()
  const lat = searchParams.get('lat')
  const lng = searchParams.get('lng')
  const [mapPosition,setMapPosition] = useState([40,0])
    useEffect(function(){
    if(lat && lng){
      setMapPosition([lat,lng])
    }},[lat,lng]) 

  return (    
    <div className={styles.mapContainer}> 
      <MapContainer
        center={mapPosition}
        zoom={13}
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
                style={{ height: '3em',borderRadius:'3px' }}
              />
              {city.cityName}
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick/>
      </MapContainer>
    </div>
  );
}

function ChangeCenter({position}){
  const map = useMap()
  map.setView(position,6)
  return null
}
function DetectClick (){
  const navigate = useNavigate()
  useMapEvents({click: e=> navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)})
  return null
}
