import type { LatLngExpression } from 'leaflet'
import { useEffect } from 'react'
import {
  CircleMarker,
  MapContainer,
  TileLayer,
  Tooltip,
  useMap,
  ZoomControl,
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import type { GeoPoint, LabelSide, Restaurant } from '../types/restaurant'

const DEFAULT_CENTER: LatLngExpression = [40.745, -73.995]
const DEFAULT_ZOOM = 11
const FOCUS_ZOOM = 13

const LABEL_OFFSETS: Record<LabelSide, [number, number]> = {
  top: [0, -4],
  bottom: [0, 4],
  left: [-4, 0],
  right: [4, 0],
}

const TILE_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
const TILE_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

function MapFocus({ point }: { readonly point: GeoPoint | null }) {
  const map = useMap()

  useEffect(() => {
    if (point) {
      map.flyTo([point.lat, point.lng], Math.max(map.getZoom(), FOCUS_ZOOM), { duration: 0.6 })
    }
  }, [map, point])

  return null
}

interface RestaurantsMapProps {
  readonly restaurants: readonly Restaurant[]
  readonly selectedId: string | null
  readonly onSelect: (id: string) => void
}

export function RestaurantsMap({ restaurants, selectedId, onSelect }: RestaurantsMapProps) {
  const selectedRestaurant = restaurants.find((restaurant) => restaurant.id === selectedId) ?? null

  return (
    <MapContainer
      center={DEFAULT_CENTER}
      zoom={DEFAULT_ZOOM}
      zoomControl={false}
      className="h-full w-full"
    >
      <TileLayer
        url={TILE_URL}
        attribution={TILE_ATTRIBUTION}
        subdomains={['a', 'b', 'c']}
        className="restaurant-map-tiles"
      />

      <ZoomControl position="bottomright" />

      <MapFocus point={selectedRestaurant?.location ?? null} />

      {restaurants.map((restaurant) => {
        const isSelected = restaurant.id === selectedId

        return (
          <CircleMarker
            key={restaurant.id}
            center={[restaurant.location.lat, restaurant.location.lng]}
            radius={isSelected ? 8 : 7}
            pathOptions={{
              color: '#ffffff',
              weight: 2,
              fillColor: isSelected ? '#f85858' : '#fbbf24',
              fillOpacity: 1,
            }}
            eventHandlers={{ click: () => onSelect(restaurant.id) }}
          >
            <Tooltip
              permanent
              direction={restaurant.labelSide}
              offset={LABEL_OFFSETS[restaurant.labelSide]}
              className="restaurant-map-tooltip"
            >
              {restaurant.name}
            </Tooltip>
          </CircleMarker>
        )
      })}
    </MapContainer>
  )
}
