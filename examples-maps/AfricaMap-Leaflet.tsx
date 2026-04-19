/**
 * VERSION LEAFLET - Pour applications nécessitant des fonctionnalités avancées
 * 
 * Avantages:
 * - Tuiles personnalisées (satellite, terrain, etc.)
 * - Clustering de marqueurs
 * - Offline possible
 * - Écosystème de plugins énorme
 */

'use client';

import { useEffect, useState } from 'react';
import { 
  MapContainer, 
  TileLayer, 
  Marker, 
  Popup, 
  GeoJSON, 
  useMap,
  ZoomControl,
  ScaleControl,
  LayersControl,
  LayerGroup
} from 'react-leaflet';
import { Icon, DivIcon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

// Fix pour les icônes Leaflet dans Next.js
const defaultIcon = new Icon({
  iconUrl: '/marker-icon.png',
  shadowUrl: '/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// ============================================
// TYPES
// ============================================

interface CountryData {
  id: string;
  name: string;
  value: number;
  lat: number;
  lng: number;
}

interface AfricaLeafletMapProps {
  data: CountryData[];
  height?: number;
  center?: [number, number];
  zoom?: number;
  showClustering?: boolean;
  tileProvider?: 'osm' | 'satellite' | 'terrain';
}

// ============================================
// COMPOSANT MAP CONTROLLER (pour contrôler la carte)
// ============================================

const MapController = ({ center, zoom }: { center: [number, number]; zoom: number }) => {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  
  return null;
};

// ============================================
// COMPOSANT PRINCIPAL
// ============================================

export const AfricaLeafletMap: React.FC<AfricaLeafletMapProps> = ({
  data,
  height = 600,
  center = [5, 20],
  zoom = 3,
  showClustering = false,
  tileProvider = 'osm'
}) => {
  const [geoJSONData, setGeoJSONData] = useState<any>(null);
  const [map, setMap] = useState<any>(null);

  // Charger le GeoJSON de l'Afrique
  useEffect(() => {
    fetch('https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson')
      .then(res => res.json())
      .then(data => {
        // Filtrer uniquement les pays africains
        const africanCountries = [
          'DZA', 'AGO', 'BEN', 'BWA', 'BFA', 'BDI', 'CPV', 'CMR', 'CAF', 'TCD',
          'COM', 'COG', 'COD', 'CIV', 'DJI', 'EGY', 'GNQ', 'ERI', 'SWZ', 'ETH',
          'GAB', 'GMB', 'GHA', 'GIN', 'GNB', 'KEN', 'LSO', 'LBR', 'LBY', 'MDG',
          'MWI', 'MLI', 'MRT', 'MUS', 'MAR', 'MOZ', 'NAM', 'NER', 'NGA', 'RWA',
          'STP', 'SEN', 'SYC', 'SLE', 'SOM', 'ZAF', 'SSD', 'SDN', 'TZA', 'TGO',
          'TUN', 'UGA', 'ZMB', 'ZWE'
        ];
        
        const filtered = {
          ...data,
          features: data.features.filter((f: any) => 
            africanCountries.includes(f.properties.ISO_A3)
          )
        };
        
        setGeoJSONData(filtered);
      });
  }, []);

  // Style choroplèthe
  const geoJSONStyle = (feature: any) => {
    const countryData = data.find(d => d.id === feature.properties.ISO_A3);
    const value = countryData?.value || 0;
    
    // Couleur basée sur la valeur
    const color = value > 5000 ? '#dc2626' :
                  value > 3000 ? '#ea580c' :
                  value > 2000 ? '#d97706' :
                  value > 1000 ? '#ca8a04' :
                  value > 500  ? '#65a30d' :
                                  '#16a34a';
    
    return {
      fillColor: countryData ? color : '#e5e7eb',
      weight: 1,
      opacity: 1,
      color: '#ffffff',
      fillOpacity: 0.7
    };
  };

  // Gestion des événements sur le GeoJSON
  const onEachFeature = (feature: any, layer: any) => {
    const countryData = data.find(d => d.id === feature.properties.ISO_A3);
    
    if (countryData) {
      layer.bindPopup(`
        <div style="font-family: sans-serif; padding: 8px;">
          <strong style="font-size: 16px;">${countryData.name}</strong><br/>
          <span style="color: #666;">PIB/habitant:</span> 
          <span style="font-weight: bold;">$${countryData.value.toLocaleString()}</span>
        </div>
      `);
      
      layer.on({
        mouseover: (e: any) => {
          const layer = e.target;
          layer.setStyle({
            weight: 3,
            color: '#2563eb',
            fillOpacity: 0.9
          });
        },
        mouseout: (e: any) => {
          const layer = e.target;
          layer.setStyle(geoJSONStyle(feature));
        }
      });
    }
  };

  // Tuiles selon le provider
  const getTileUrl = () => {
    switch (tileProvider) {
      case 'satellite':
        return 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
      case 'terrain':
        return 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';
      case 'osm':
      default:
        return 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    }
  };

  return (
    <div style={{ height, width: '100%' }} className="rounded-xl overflow-hidden border border-gray-200">
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
        whenReady={(mapInstance: any) => setMap(mapInstance.target)}
      >
        <MapController center={center} zoom={zoom} />
        <ZoomControl position="bottomright" />
        <ScaleControl position="bottomleft" />
        
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked={tileProvider === 'osm'} name="OpenStreetMap">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          
          <LayersControl.BaseLayer name="Satellite">
            <TileLayer
              attribution='&copy; Esri'
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />
          </LayersControl.BaseLayer>
          
          <LayersControl.BaseLayer name="Terrain">
            <TileLayer
              attribution='&copy; OpenTopoMap'
              url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          
          <LayersControl.Overlay checked name="PIB par habitant">
            <LayerGroup>
              {geoJSONData && (
                <GeoJSON
                  data={geoJSONData}
                  style={geoJSONStyle}
                  onEachFeature={onEachFeature}
                />
              )}
            </LayerGroup>
          </LayersControl.Overlay>
          
          <LayersControl.Overlay checked name="Capitales">
            <LayerGroup>
              {data.map((country) => (
                <Marker
                  key={country.id}
                  position={[country.lat, country.lng]}
                  icon={defaultIcon}
                >
                  <Popup>
                    <div className="text-sm">
                      <strong className="text-lg">{country.name}</strong><br/>
                      <span className="text-gray-600">PIB/habitant:</span>{' '}
                      <span className="font-semibold">${country.value.toLocaleString()}</span>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </LayerGroup>
          </LayersControl.Overlay>
        </LayersControl>
      </MapContainer>
    </div>
  );
};

export default AfricaLeafletMap;
