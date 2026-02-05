/**
 * EXEMPLE D'UTILISATION - Page Next.js complète
 * 
 * Cette page démontre l'utilisation du composant AfricaMap
 * avec différentes configurations et jeux de données
 */

'use client';

import { useState } from 'react';
import { AfricaMap } from './AfricaMap-ReactSimpleMaps';

// ============================================
// DONNÉES EXEMPLE - PIB par habitant 2023
// ============================================

const gdpData = [
  { id: 'DZA', name: 'Algérie', value: 4290, details: { 'PIB Total': '$178B', 'Population': '45M' } },
  { id: 'AGO', name: 'Angola', value: 2195, details: { 'PIB Total': '$72B', 'Population': '33M' } },
  { id: 'BEN', name: 'Bénin', value: 1304, details: { 'PIB Total': '$18B', 'Population': '13M' } },
  { id: 'BWA', name: 'Botswana', value: 7731, details: { 'PIB Total': '$19B', 'Population': '2.5M' } },
  { id: 'BFA', name: 'Burkina Faso', value: 830, details: { 'PIB Total': '$19B', 'Population': '23M' } },
  { id: 'BDI', name: 'Burundi', value: 221, details: { 'PIB Total': '$3B', 'Population': '13M' } },
  { id: 'CPV', name: 'Cap-Vert', value: 3605, details: { 'PIB Total': '$2B', 'Population': '0.5M' } },
  { id: 'CMR', name: 'Cameroun', value: 1508, details: { 'PIB Total': '$45B', 'Population': '27M' } },
  { id: 'CAF', name: 'République centrafricaine', value: 461, details: { 'PIB Total': '$2.5B', 'Population': '5.5M' } },
  { id: 'TCD', name: 'Tchad', value: 716, details: { 'PIB Total': '$13B', 'Population': '18M' } },
  { id: 'COM', name: 'Comores', value: 1481, details: { 'PIB Total': '$1.3B', 'Population': '0.9M' } },
  { id: 'COG', name: 'Congo', value: 2550, details: { 'PIB Total': '$14B', 'Population': '6M' } },
  { id: 'COD', name: 'RDC', value: 577, details: { 'PIB Total': '$67B', 'Population': '102M' } },
  { id: 'CIV', name: 'Côte d\'Ivoire', value: 2486, details: { 'PIB Total': '$70B', 'Population': '28M' } },
  { id: 'DJI', name: 'Djibouti', value: 3132, details: { 'PIB Total': '$3.8B', 'Population': '1.1M' } },
  { id: 'EGY', name: 'Égypte', value: 4295, details: { 'PIB Total': '$476B', 'Population': '112M' } },
  { id: 'GNQ', name: 'Guinée équatoriale', value: 6709, details: { 'PIB Total': '$12B', 'Population': '1.7M' } },
  { id: 'ERI', name: 'Érythrée', value: 642, details: { 'PIB Total': '$2.3B', 'Population': '3.6M' } },
  { id: 'SWZ', name: 'Eswatini', value: 3995, details: { 'PIB Total': '$4.6B', 'Population': '1.2M' } },
  { id: 'ETH', name: 'Éthiopie', value: 1027, details: { 'PIB Total': '$163B', 'Population': '126M' } },
  { id: 'GAB', name: 'Gabon', value: 8820, details: { 'PIB Total': '$20B', 'Population': '2.3M' } },
  { id: 'GMB', name: 'Gambie', value: 808, details: { 'PIB Total': '$2.2B', 'Population': '2.7M' } },
  { id: 'GHA', name: 'Ghana', value: 2447, details: { 'PIB Total': '$77B', 'Population': '34M' } },
  { id: 'GIN', name: 'Guinée', value: 1384, details: { 'PIB Total': '$21B', 'Population': '14M' } },
  { id: 'GNB', name: 'Guinée-Bissau', value: 795, details: { 'PIB Total': '$1.6B', 'Population': '2M' } },
  { id: 'KEN', name: 'Kenya', value: 2099, details: { 'PIB Total': '$114B', 'Population': '55M' } },
  { id: 'LSO', name: 'Lesotho', value: 999, details: { 'PIB Total': '$2.4B', 'Population': '2.3M' } },
  { id: 'LBR', name: 'Liberia', value: 755, details: { 'PIB Total': '$4B', 'Population': '5.3M' } },
  { id: 'LBY', name: 'Libye', value: 6537, details: { 'PIB Total': '$40B', 'Population': '6.9M' } },
  { id: 'MDG', name: 'Madagascar', value: 523, details: { 'PIB Total': '$16B', 'Population': '30M' } },
  { id: 'MWI', name: 'Malawi', value: 645, details: { 'PIB Total': '$13B', 'Population': '20M' } },
  { id: 'MLI', name: 'Mali', value: 833, details: { 'PIB Total': '$19B', 'Population': '23M' } },
  { id: 'MRT', name: 'Mauritanie', value: 2216, details: { 'PIB Total': '$10B', 'Population': '4.9M' } },
  { id: 'MUS', name: 'Maurice', value: 10233, details: { 'PIB Total': '$13B', 'Population': '1.3M' } },
  { id: 'MAR', name: 'Maroc', value: 3527, details: { 'PIB Total': '$142B', 'Population': '37M' } },
  { id: 'MOZ', name: 'Mozambique', value: 493, details: { 'PIB Total': '$18B', 'Population': '33M' } },
  { id: 'NAM', name: 'Namibie', value: 4549, details: { 'PIB Total': '$12B', 'Population': '2.6M' } },
  { id: 'NER', name: 'Niger', value: 585, details: { 'PIB Total': '$16B', 'Population': '27M' } },
  { id: 'NGA', name: 'Nigeria', value: 2065, details: { 'PIB Total': '$477B', 'Population': '223M' } },
  { id: 'RWA', name: 'Rwanda', value: 966, details: { 'PIB Total': '$14B', 'Population': '14M' } },
  { id: 'STP', name: 'Sao Tomé-et-Principe', value: 2263, details: { 'PIB Total': '$0.6B', 'Population': '0.2M' } },
  { id: 'SEN', name: 'Sénégal', value: 1599, details: { 'PIB Total': '$31B', 'Population': '18M' } },
  { id: 'SYC', name: 'Seychelles', value: 14931, details: { 'PIB Total': '$2B', 'Population': '0.1M' } },
  { id: 'SLE', name: 'Sierra Leone', value: 461, details: { 'PIB Total': '$4B', 'Population': '8.8M' } },
  { id: 'SOM', name: 'Somalie', value: 445, details: { 'PIB Total': '$8B', 'Population': '18M' } },
  { id: 'ZAF', name: 'Afrique du Sud', value: 6776, details: { 'PIB Total': '$405B', 'Population': '60M' } },
  { id: 'SSD', name: 'Soudan du Sud', value: 1070, details: { 'PIB Total': '$6B', 'Population': '11M' } },
  { id: 'SDN', name: 'Soudan', value: 764, details: { 'PIB Total': '$52B', 'Population': '49M' } },
  { id: 'TZA', name: 'Tanzanie', value: 1192, details: { 'PIB Total': '$76B', 'Population': '67M' } },
  { id: 'TGO', name: 'Togo', value: 943, details: { 'PIB Total': '$8B', 'Population': '9M' } },
  { id: 'TUN', name: 'Tunisie', value: 3317, details: { 'PIB Total': '$51B', 'Population': '12M' } },
  { id: 'UGA', name: 'Ouganda', value: 964, details: { 'PIB Total': '$49B', 'Population': '48M' } },
  { id: 'ZMB', name: 'Zambie', value: 1361, details: { 'PIB Total': '$29B', 'Population': '20M' } },
  { id: 'ZWE', name: 'Zimbabwe', value: 1736, details: { 'PIB Total': '$32B', 'Population': '16M' } }
];

// Grandes villes africaines
const majorCities = [
  { name: 'Lagos', lat: 6.5244, lng: 3.3792, value: 14800000 },
  { name: 'Le Caire', lat: 30.0444, lng: 31.2357, value: 20900000 },
  { name: 'Kinshasa', lat: -4.4419, lng: 15.2663, value: 17100000 },
  { name: 'Johannesburg', lat: -26.2041, lng: 28.0473, value: 5800000 },
  { name: 'Casablanca', lat: 33.5731, lng: -7.5898, value: 3700000 },
  { name: 'Nairobi', lat: -1.2921, lng: 36.8219, value: 4400000 },
  { name: 'Abidjan', lat: 5.36, lng: -4.0083, value: 5100000 },
];

// ============================================
// PAGE PRINCIPALE
// ============================================

export default function AfricaMapPage() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [colorScale, setColorScale] = useState<'linear' | 'threshold' | 'quantize'>('linear');
  const [showCities, setShowCities] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Carte Interactive de l'Afrique
          </h1>
          <p className="text-gray-600">
            Visualisation du PIB par habitant (USD) - Données 2023
          </p>
        </div>

        {/* Contrôles */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">
                Type d'échelle:
              </label>
              <select
                value={colorScale}
                onChange={(e) => setColorScale(e.target.value as any)}
                className="block w-40 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="linear">Linéaire</option>
                <option value="threshold">Seuils</option>
                <option value="quantize">Quantiles</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="showCities"
                checked={showCities}
                onChange={(e) => setShowCities(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="showCities" className="text-sm text-gray-700">
                Afficher les grandes villes
              </label>
            </div>

            {selectedCountry && (
              <div className="ml-auto px-4 py-2 bg-blue-50 rounded-lg border border-blue-200">
                <span className="text-sm text-blue-800">
                  Pays sélectionné: <strong>{selectedCountry}</strong>
                </span>
                <button
                  onClick={() => setSelectedCountry(null)}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Carte */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <AfricaMap
            data={gdpData}
            cities={showCities ? majorCities : []}
            title="PIB par habitant (USD, 2023)"
            height={650}
            colorScale={colorScale}
            colors={['#fef3c7', '#dc2626']}
            onCountryClick={(country) => setSelectedCountry(country.name)}
            showBorders={true}
            borderWidth={0.5}
            borderColor="#ffffff"
            noDataColor="#e5e7eb"
            enableZoom={true}
            initialZoom={1}
          />
        </div>

        {/* Statistiques */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              PIB/habitant moyen
            </h3>
            <p className="text-3xl font-bold text-blue-600">
              ${Math.round(gdpData.reduce((acc, c) => acc + c.value, 0) / gdpData.length).toLocaleString()}
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Plus haut PIB/habitant
            </h3>
            <p className="text-3xl font-bold text-green-600">
              ${Math.max(...gdpData.map(c => c.value)).toLocaleString()}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {gdpData.find(c => c.value === Math.max(...gdpData.map(x => x.value)))?.name}
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Plus bas PIB/habitant
            </h3>
            <p className="text-3xl font-bold text-red-600">
              ${Math.min(...gdpData.map(c => c.value)).toLocaleString()}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {gdpData.find(c => c.value === Math.min(...gdpData.map(x => x.value)))?.name}
            </p>
          </div>
        </div>

        {/* Note */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Données: Banque Mondiale (2023) | Zoom avec la molette ou les boutons | 
            Cliquez sur un pays pour plus de détails
          </p>
        </div>
      </div>
    </div>
  );
}
