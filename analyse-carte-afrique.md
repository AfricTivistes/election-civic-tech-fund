# Analyse : Solutions Carte Interactive Afrique pour React/Next.js

## 1. React-Simple-Maps 🏆 (RECOMMANDÉ)
**Bibliothèque SVG légère pour cartes géographiques déclaratives**

### Points forts
- **Bundle ultra-léger** : ~30kb gzippé (vs 500kb+ pour Leaflet)
- API déclarative React native
- Support TypeScript
- Pas de dépendance DOM externe (rendu SVG pur)
- Zoom/pan intégrés
- Compatible SSR Next.js

### Points faibles
- Nécessite un fichier TopoJSON/GeoJSON personnalisé
- Moins de features avancées (pas de clustering, etc.)
- Rendu limité au SVG (pas de tuiles)

### Installation
```bash
npm install react-simple-maps
```

### Exemple : Carte Afrique Choroplèthe
```tsx
'use client';

import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { scaleLinear } from 'd3-scale';

// GeoJSON des pays africains
const AFRICA_GEO_URL = 'https://raw.githubusercontent.com/deldersveld/topojson/master/continents/africa.json';

const data = [
  { id: 'DZA', value: 42 }, // Algérie
  { id: 'AGO', value: 65 }, // Angola
  { id: 'BEN', value: 12 }, // Bénin
  { id: 'BWA', value: 78 }, // Botswana
  // ... autres pays
];

const colorScale = scaleLinear()
  .domain([0, 100])
  .range(['#ffeb3b', '#f44336']);

export default function AfricaMap() {
  return (
    <div style={{ width: '100%', height: '500px' }}>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 400,
          center: [20, 5]
        }}
      >
        <Geographies geography={AFRICA_GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const countryData = data.find(d => d.id === geo.id);
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={countryData ? colorScale(countryData.value) : '#e0e0e0'}
                  stroke="#ffffff"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: 'none' },
                    hover: { outline: 'none', fill: '#2c3e50' },
                    pressed: { outline: 'none' }
                  }}
                  onClick={() => console.log('Clicked:', geo.properties.name)}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
}
```

---

## 2. React-Leaflet 🍃 (CLASSIQUE)
**Wrapper React pour la bibliothèque Leaflet (standard de facto)**

### Points forts
- Mature et battle-tested (5.5k stars)
- Écosystème Leaflet énorme (plugins, tuiles personnalisées)
- Support mobile tactile natif
- Clustering de marqueurs
- Offline possible avec tuiles locales

### Points faibles
- **Bundle lourd** : ~500kb+ avec Leaflet
- Nécessite CSS de Leaflet
- Problèmes SSR (nécessite dynamic import)
- Moins performant pour simples choroplèthes

### Installation
```bash
npm install react-leaflet leaflet
npm install -D @types/leaflet
```

### Exemple : Carte Afrique avec Marqueurs
```tsx
'use client';

import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Données exemple
const cities = [
  { name: 'Lagos', lat: 6.5244, lng: 3.3792, country: 'Nigeria' },
  { name: 'Le Caire', lat: 30.0444, lng: 31.2357, country: 'Égypte' },
  { name: 'Johannesburg', lat: -26.2041, lng: 28.0473, country: 'Afrique du Sud' },
];

// GeoJSON simplifié de l'Afrique (à remplacer par vrai fichier)
const africaGeoJSON = {
  type: 'FeatureCollection',
  features: [] // Ajouter données GeoJSON
};

const customIcon = new Icon({
  iconUrl: '/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

export default function AfricaLeafletMap() {
  return (
    <MapContainer
      center={[5, 20]}
      zoom={3}
      style={{ height: '500px', width: '100%' }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {/* Choroplèthe overlay */}
      <GeoJSON
        data={africaGeoJSON}
        style={(feature) => ({
          fillColor: feature?.properties.value > 50 ? '#f44336' : '#4caf50',
          weight: 2,
          opacity: 1,
          color: 'white',
          fillOpacity: 0.7
        })}
      />
      
      {cities.map((city) => (
        <Marker key={city.name} position={[city.lat, city.lng]} icon={customIcon}>
          <Popup>
            <b>{city.name}</b><br />
            {city.country}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
```

---

## 3. Nivo Geo 📊 (DATAVIZ)
**Composant cartographie de la suite Nivo (basé D3)**

### Points forts
- Intégration parfaite écosystème Nivo
- Animations fluides (react-spring)
- Thèmes et légendes intégrés
- Responsive par défaut
- Documentation excellente
- Support SSR

### Points faibles
- Bundle moyen (~200kb)
- Moins flexible que solution custom
- Dépendant de l'écosystème Nivo

### Installation
```bash
npm install @nivo/core @nivo/geo
```

### Exemple : Choroplèthe Afrique
```tsx
'use client';

import { ResponsiveChoropleth } from '@nivo/geo';

// Données
const data = [
  { id: 'AGO', value: 65 },
  { id: 'BEN', value: 12 },
  { id: 'BWA', value: 78 },
  { id: 'BFA', value: 34 },
  { id: 'BDI', value: 23 },
  // ...
];

// GeoJSON des pays africains
const africaFeatures = [
  // Array de features GeoJSON
];

export default function AfricaNivoMap() {
  return (
    <div style={{ height: '500px' }}>
      <ResponsiveChoropleth
        data={data}
        features={africaFeatures}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        colors="YlOrRd"
        domain={[0, 100]}
        unknownColor="#e0e0e0"
        label="properties.name"
        valueFormat=".2s"
        projectionTranslation={[0.5, 0.5]}
        projectionRotation={[0, 0, 0]}
        enableGraticule={true}
        graticuleLineColor="#dddddd"
        borderWidth={0.5}
        borderColor="#ffffff"
        legends={[
          {
            anchor: 'bottom-left',
            direction: 'column',
            justify: true,
            translateX: 20,
            translateY: -20,
            itemsSpacing: 0,
            itemWidth: 94,
            itemHeight: 18,
            itemDirection: 'left-to-right',
            itemTextColor: '#444444',
            itemOpacity: 0.85,
            symbolSize: 18,
            effects: [
              {
                on: 'hover',
                style: {
                  itemTextColor: '#000000',
                  itemOpacity: 1
                }
              }
            ]
          }
        ]}
        onClick={(feature) => console.log(feature)}
      />
    </div>
  );
}
```

---

## 4. React-Plotly.js 📈 (ENTERPRISE)
**Wrapper React pour Plotly.js (cartes choroplèthes avancées)**

### Points forts
- Cartes choroplèthes natives très puissantes
- Support projections multiples
- Tooltips interactifs avancés
- Export PNG/SVG natif
- Support géocodage intégré

### Points faibles
- **Bundle massif** : 2-6MB selon build
- Nécessite configuration webpack pour optimiser
- Moins "React-native" que autres solutions
- Performance moindre avec gros datasets

### Installation
```bash
npm install react-plotly.js plotly.js
```

### Exemple : Choroplèthe Afrique Plotly
```tsx
'use client';

import dynamic from 'next/dynamic';

// Import dynamique obligatoire pour éviter SSR issues
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

const data = [
  {
    type: 'choropleth',
    locationmode: 'ISO-3',
    locations: ['DZA', 'AGO', 'BEN', 'BWA', 'BFA', 'BDI'],
    z: [42, 65, 12, 78, 34, 23],
    text: ['Algérie', 'Angola', 'Bénin', 'Botswana', 'Burkina Faso', 'Burundi'],
    autocolorscale: true,
    colorbar: {
      title: 'Valeur',
      thickness: 20
    },
    marker: {
      line: {
        color: 'rgb(255,255,255)',
        width: 1
      }
    }
  }
];

const layout = {
  title: 'Carte Choroplèthe - Afrique',
  geo: {
    scope: 'africa',
    showframe: false,
    showcoastlines: true,
    coastlinecolor: 'rgb(100,100,100)',
    projection: {
      type: 'mercator'
    },
    bgcolor: 'rgba(0,0,0,0)',
    lakecolor: 'rgb(255, 255, 255)',
    showocean: true,
    oceancolor: 'rgb(220, 230, 240)'
  },
  paper_bgcolor: 'rgba(0,0,0,0)',
  plot_bgcolor: 'rgba(0,0,0,0)',
  autosize: true,
  height: 600
};

const config = {
  responsive: true,
  displayModeBar: false
};

export default function AfricaPlotlyMap() {
  return (
    <Plot
      data={data}
      layout={layout}
      config={config}
      style={{ width: '100%', height: '100%' }}
      onClick={(data) => console.log('Clicked:', data.points[0].location)}
    />
  );
}
```

---

## 📊 Tableau Comparatif

| Critère | React-Simple-Maps | React-Leaflet | Nivo Geo | Plotly.js |
|---------|------------------|---------------|----------|-----------|
| **Bundle** | ⭐⭐⭐ 30kb | ⭐⭐ 500kb | ⭐⭐ 200kb | ❌ 2-6MB |
| **Performance** | ⭐⭐⭐ Excellente | ⭐⭐ Bonne | ⭐⭐ Bonne | ⭐ Moyenne |
| **SSR** | ⭐⭐⭐ Native | ⭐⭐ Dynamic import | ⭐⭐⭐ Native | ⭐⭐ Dynamic import |
| **Facilité** | ⭐⭐⭐ Simple | ⭐⭐ Moyen | ⭐⭐⭐ Simple | ⭐⭐ Moyen |
| **Choroplèthe** | ⭐⭐ Manuel | ⭐⭐ Plugin | ⭐⭐⭐ Natif | ⭐⭐⭐ Natif |
| **Mobile** | ⭐⭐ Bon | ⭐⭐⭐ Excellent | ⭐⭐ Bon | ⭐⭐ Bon |
| **Personnalisation** | ⭐⭐⭐ Haute | ⭐⭐⭐ Haute | ⭐⭐ Moyenne | ⭐⭐ Moyenne |
| **Communauté** | ⭐⭐⭐ 3.3k stars | ⭐⭐⭐ 5.5k stars | ⭐⭐⭐ 14k stars | ⭐⭐⭐ 1.1k stars |

---

## 🎯 Recommandations

### Cas d'usage par solution :

1. **React-Simple-Maps** → Dashboards/dataviz avec carte choroplèthe simple, besoin de performance et bundle léger
2. **React-Leaflet** → Applications cartographiques complexes (routing, offline, clustering, marqueurs multiples)
3. **Nivo Geo** → Déjà utilisateur Nivo, besoin de cohérence UI avec autres graphiques
4. **Plotly.js** → Rapports/exports PDF, besoin de cartes très personnalisées avec projections avancées

### Pour une carte de l'Afrique interactive :

- **Recommandation principale** : React-Simple-Maps (léger, performant, parfait pour choroplèthes)
- **Si besoin de fonctionnalités avancées** : React-Leaflet
- **Si déjà dans écosystème Nivo** : Nivo Geo

---

## 📚 Ressources GeoJSON Afrique

```javascript
// Sources de données géographiques :
const sources = {
  topojson_world: 'https://github.com/topojson/world-atlas',
  natural_earth: 'https://github.com/nvkelso/natural-earth-vector',
  deldersveld: 'https://github.com/deldersveld/topojson',
  // API World Bank
  world_bank_geo: 'https://api.worldbank.org/v2/country?format=json&per_page=300'
};
```
