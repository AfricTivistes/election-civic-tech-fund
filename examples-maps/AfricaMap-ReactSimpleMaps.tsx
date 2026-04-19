/**
 * COMPOSANT CARTE AFRIQUE - VERSION FINALE PRODUCTION
 * Utilise React-Simple-Maps (recommandation principale)
 * 
 * Features:
 * - Choroplèthe dynamique avec échelle de couleurs
 * - Interactivité (hover, click, tooltip)
 * - Légende personnalisée
 * - Responsive
 * - TypeScript strict
 * - Support Next.js App Router (Client Component)
 */

'use client';

import React, { useState, useMemo, useCallback } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker
} from 'react-simple-maps';
import { scaleLinear, scaleThreshold, scaleQuantize } from 'd3-scale';
import { format } from 'd3-format';

// ============================================
// TYPES
// ============================================

interface CountryData {
  id: string;          // ISO-3 code
  name: string;        // Nom du pays
  value: number;       // Valeur pour choroplèthe
  details?: Record<string, string | number>;
}

interface CityData {
  name: string;
  lat: number;
  lng: number;
  value?: number;
}

interface AfricaMapProps {
  /** Données par pays (ISO-3 code → valeur) */
  data: CountryData[];
  /** Villes à afficher comme marqueurs */
  cities?: CityData[];
  /** Titre de la carte */
  title?: string;
  /** Hauteur en pixels */
  height?: number;
  /** Type d'échelle de couleurs */
  colorScale?: 'linear' | 'threshold' | 'quantize';
  /** Palette de couleurs (couleurs de début et fin) */
  colors?: [string, string];
  /** Valeur minimum pour l'échelle */
  minValue?: number;
  /** Valeur maximum pour l'échelle */
  maxValue?: number;
  /** Callback au clic sur un pays */
  onCountryClick?: (country: CountryData) => void;
  /** Afficher les frontières */
  showBorders?: boolean;
  /** Épaisseur des frontières */
  borderWidth?: number;
  /** Couleur des frontières */
  borderColor?: string;
  /** Couleur de fond (pays sans données) */
  noDataColor?: string;
  /** Activer le zoom/pan */
  enableZoom?: boolean;
  /** Zoom initial */
  initialZoom?: number;
  /** Centre initial [longitude, latitude] */
  center?: [number, number];
  /** Tooltip personnalisé */
  renderTooltip?: (country: CountryData) => React.ReactNode;
}

// ============================================
// CONSTANTES
// ============================================

const AFRICA_GEO_URL = 'https://raw.githubusercontent.com/deldersveld/topojson/master/continents/africa.json';

const DEFAULT_COLORS: [string, string] = ['#e8f5e9', '#1b5e20'];

const AFRICA_CENTER: [number, number] = [20, 5];

// Projection Mercator optimisée pour l'Afrique
const PROJECTION_CONFIG = {
  scale: 400,
  center: AFRICA_CENTER
};

// ============================================
// UTILITAIRES
// ============================================

/**
 * Crée une échelle de couleurs selon le type spécifié
 */
const createColorScale = (
  type: AfricaMapProps['colorScale'],
  min: number,
  max: number,
  colors: [string, string]
) => {
  switch (type) {
    case 'threshold':
      return scaleThreshold<number, string>()
        .domain([min, min + (max - min) * 0.25, min + (max - min) * 0.5, min + (max - min) * 0.75])
        .range([colors[0], '#ffeb3b', '#ff9800', '#f44336', colors[1]]);
    
    case 'quantize':
      return scaleQuantize<string>()
        .domain([min, max])
        .range([colors[0], '#c8e6c9', '#81c784', '#4caf50', colors[1]]);
    
    case 'linear':
    default:
      return scaleLinear<string, string>()
        .domain([min, max])
        .range(colors);
  }
};

/**
 * Légende de la carte
 */
const MapLegend: React.FC<{
  colors: [string, string];
  minValue: number;
  maxValue: number;
  title?: string;
}> = ({ colors, minValue, maxValue, title }) => {
  const gradientId = useMemo(() => `legend-gradient-${Math.random().toString(36).substr(2, 9)}`, []);
  
  return (
    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-gray-200">
      {title && <h4 className="text-sm font-semibold mb-2 text-gray-800">{title}</h4>}
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-600 w-12 text-right">
          {format('.2s')(minValue)}
        </span>
        <svg width="150" height="20" className="rounded overflow-hidden">
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={colors[0]} />
              <stop offset="100%" stopColor={colors[1]} />
            </linearGradient>
          </defs>
          <rect width="150" height="20" fill={`url(#${gradientId})`} />
        </svg>
        <span className="text-xs text-gray-600 w-12">
          {format('.2s')(maxValue)}
        </span>
      </div>
    </div>
  );
};

/**
 * Tooltip par défaut
 */
const DefaultTooltip: React.FC<{ country: CountryData }> = ({ country }) => (
  <div className="bg-gray-900 text-white px-3 py-2 rounded-lg shadow-lg text-sm">
    <strong className="block text-base mb-1">{country.name}</strong>
    <span className="text-gray-300">Valeur: </span>
    <span className="font-mono font-semibold">{format(',')(country.value)}</span>
    {country.details && (
      <div className="mt-2 pt-2 border-t border-gray-700 text-xs text-gray-400">
        {Object.entries(country.details).map(([key, value]) => (
          <div key={key} className="flex justify-between gap-4">
            <span>{key}:</span>
            <span>{value}</span>
          </div>
        ))}
      </div>
    )}
  </div>
);

// ============================================
// COMPOSANT PRINCIPAL
// ============================================

export const AfricaMap: React.FC<AfricaMapProps> = ({
  data,
  cities = [],
  title,
  height = 600,
  colorScale = 'linear',
  colors = DEFAULT_COLORS,
  minValue,
  maxValue,
  onCountryClick,
  showBorders = true,
  borderWidth = 0.5,
  borderColor = '#ffffff',
  noDataColor = '#e0e0e0',
  enableZoom = true,
  initialZoom = 1,
  center = AFRICA_CENTER,
  renderTooltip
}) => {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number } | null>(null);
  const [zoom, setZoom] = useState(initialZoom);
  
  // Calcul des valeurs min/max
  const dataValues = useMemo(() => data.map(d => d.value), [data]);
  const computedMin = minValue ?? Math.min(...dataValues);
  const computedMax = maxValue ?? Math.max(...dataValues);
  
  // Création de l'échelle de couleurs
  const colorScaleFn = useMemo(
    () => createColorScale(colorScale, computedMin, computedMax, colors),
    [colorScale, computedMin, computedMax, colors]
  );
  
  // Index des données pour lookup rapide
  const dataIndex = useMemo(() => {
    return new Map(data.map(d => [d.id, d]));
  }, [data]);
  
  // Gestionnaires d'événements
  const handleMouseEnter = useCallback((geo: any, evt: any) => {
    setHoveredCountry(geo.id);
    setTooltipPosition({ x: evt.clientX + 10, y: evt.clientY - 10 });
  }, []);
  
  const handleMouseMove = useCallback((evt: any) => {
    setTooltipPosition({ x: evt.clientX + 10, y: evt.clientY - 10 });
  }, []);
  
  const handleMouseLeave = useCallback(() => {
    setHoveredCountry(null);
    setTooltipPosition(null);
  }, []);
  
  const handleClick = useCallback((geo: any) => {
    const countryData = dataIndex.get(geo.id);
    if (countryData && onCountryClick) {
      onCountryClick(countryData);
    }
  }, [dataIndex, onCountryClick]);

  return (
    <div className="relative w-full" style={{ height }}>
      {title && (
        <h2 className="text-xl font-bold mb-4 text-gray-800">{title}</h2>
      )}
      
      <div className="relative w-full h-full bg-blue-50/30 rounded-xl overflow-hidden border border-gray-200">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            ...PROJECTION_CONFIG,
            center
          }}
          width={800}
          height={600}
          style={{ width: '100%', height: '100%' }}
        >
          {enableZoom ? (
            <ZoomableGroup
              zoom={zoom}
              onZoomChange={setZoom}
              minZoom={0.5}
              maxZoom={8}
              center={center}
            >
              <MapContent
                dataIndex={dataIndex}
                colorScaleFn={colorScaleFn}
                noDataColor={noDataColor}
                showBorders={showBorders}
                borderWidth={borderWidth}
                borderColor={borderColor}
                hoveredCountry={hoveredCountry}
                cities={cities}
                onMouseEnter={handleMouseEnter}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={handleClick}
              />
            </ZoomableGroup>
          ) : (
            <MapContent
              dataIndex={dataIndex}
              colorScaleFn={colorScaleFn}
              noDataColor={noDataColor}
              showBorders={showBorders}
              borderWidth={borderWidth}
              borderColor={borderColor}
              hoveredCountry={hoveredCountry}
              cities={cities}
              onMouseEnter={handleMouseEnter}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={handleClick}
            />
          )}
        </ComposableMap>
        
        {/* Légende */}
        <MapLegend
          colors={colors}
          minValue={computedMin}
          maxValue={computedMax}
          title={title ? `Échelle - ${title}` : 'Échelle'}
        />
        
        {/* Contrôles de zoom */}
        {enableZoom && (
          <div className="absolute bottom-4 right-4 flex flex-col gap-2">
            <button
              onClick={() => setZoom(z => Math.min(z * 1.5, 8))}
              className="bg-white hover:bg-gray-50 text-gray-700 p-2 rounded-lg shadow-md border border-gray-200 transition-colors"
              aria-label="Zoomer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
            <button
              onClick={() => setZoom(z => Math.max(z / 1.5, 0.5))}
              className="bg-white hover:bg-gray-50 text-gray-700 p-2 rounded-lg shadow-md border border-gray-200 transition-colors"
              aria-label="Dézoomer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>
            <button
              onClick={() => setZoom(initialZoom)}
              className="bg-white hover:bg-gray-50 text-gray-700 p-2 rounded-lg shadow-md border border-gray-200 transition-colors"
              aria-label="Réinitialiser"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
        )}
        
        {/* Tooltip */}
        {tooltipPosition && hoveredCountry && (
          <div
            className="fixed pointer-events-none z-50"
            style={{
              left: tooltipPosition.x,
              top: tooltipPosition.y
            }}
          >
            {(() => {
              const country = dataIndex.get(hoveredCountry);
              if (!country) return null;
              return renderTooltip ? renderTooltip(country) : <DefaultTooltip country={country} />;
            })()}
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================
// SOUS-COMPOSANT - Contenu de la carte
// ============================================

interface MapContentProps {
  dataIndex: Map<string, CountryData>;
  colorScaleFn: any;
  noDataColor: string;
  showBorders: boolean;
  borderWidth: number;
  borderColor: string;
  hoveredCountry: string | null;
  cities: CityData[];
  onMouseEnter: (geo: any, evt: any) => void;
  onMouseMove: (evt: any) => void;
  onMouseLeave: () => void;
  onClick: (geo: any) => void;
}

const MapContent: React.FC<MapContentProps> = ({
  dataIndex,
  colorScaleFn,
  noDataColor,
  showBorders,
  borderWidth,
  borderColor,
  hoveredCountry,
  cities,
  onMouseEnter,
  onMouseMove,
  onMouseLeave,
  onClick
}) => {
  return (
    <>
      <Geographies geography={AFRICA_GEO_URL}>
        {({ geographies }) =>
          geographies.map((geo) => {
            const countryData = dataIndex.get(geo.id);
            const isHovered = hoveredCountry === geo.id;
            
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={countryData ? colorScaleFn(countryData.value) : noDataColor}
                stroke={showBorders ? borderColor : 'transparent'}
                strokeWidth={isHovered ? borderWidth * 2 : borderWidth}
                style={{
                  default: {
                    outline: 'none',
                    transition: 'all 0.2s ease'
                  },
                  hover: {
                    outline: 'none',
                    fill: countryData ? '#2c3e50' : noDataColor,
                    cursor: 'pointer'
                  },
                  pressed: {
                    outline: 'none',
                    fill: '#1a252f'
                  }
                }}
                onMouseEnter={(evt) => onMouseEnter(geo, evt)}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                onClick={() => onClick(geo)}
              />
            );
          })
        }
      </Geographies>
      
      {/* Marqueurs de villes */}
      {cities.map((city) => (
        <Marker key={city.name} coordinates={[city.lng, city.lat]}>
          <circle
            r={6}
            fill="#ef4444"
            stroke="#ffffff"
            strokeWidth={2}
            className="cursor-pointer hover:r-8 transition-all"
          />
          <text
            textAnchor="middle"
            y={-12}
            className="text-xs font-semibold fill-gray-700 pointer-events-none"
            style={{ fontSize: '10px', fontWeight: 600 }}
          >
            {city.name}
          </text>
        </Marker>
      ))}
    </>
  );
};

export default AfricaMap;
