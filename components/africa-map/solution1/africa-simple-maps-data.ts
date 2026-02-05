export interface CountryGeoData {
  code: string
  name: { fr: string; en: string }
  flag: string
  lat: number
  lng: number
  projectCount: number
}

export const countriesWithCoordinates: CountryGeoData[] = [
  {
    code: 'ss',
    name: { fr: 'Soudan du Sud', en: 'South Sudan' },
    flag: '🇸🇸',
    lat: 6.877,
    lng: 31.307,
    projectCount: 1
  },
  {
    code: 'bj',
    name: { fr: 'Bénin', en: 'Benin' },
    flag: '🇧🇯',
    lat: 9.307,
    lng: 2.315,
    projectCount: 1
  },
  {
    code: 'cm',
    name: { fr: 'Cameroun', en: 'Cameroon' },
    flag: '🇨🇲',
    lat: 7.369,
    lng: 12.354,
    projectCount: 2
  },
  {
    code: 'sn',
    name: { fr: 'Sénégal', en: 'Senegal' },
    flag: '🇸🇳',
    lat: 14.497,
    lng: -14.452,
    projectCount: 2
  },
  {
    code: 'gn',
    name: { fr: 'Guinée', en: 'Guinea' },
    flag: '🇬🇳',
    lat: 9.945,
    lng: -9.696,
    projectCount: 1
  },
  {
    code: 'mr',
    name: { fr: 'Mauritanie', en: 'Mauritania' },
    flag: '🇲🇷',
    lat: 21.007,
    lng: -10.940,
    projectCount: 1
  },
  {
    code: 'et',
    name: { fr: 'Éthiopie', en: 'Ethiopia' },
    flag: '🇪🇹',
    lat: 9.145,
    lng: 40.489,
    projectCount: 2
  },
  {
    code: 'so',
    name: { fr: 'Somalie', en: 'Somalia' },
    flag: '🇸🇴',
    lat: 5.152,
    lng: 46.199,
    projectCount: 2
  }
]

export function getCountryByCode(code: string): CountryGeoData | undefined {
  return countriesWithCoordinates.find(c => c.code === code)
}

export function getAllCountriesGeo(): CountryGeoData[] {
  return countriesWithCoordinates
}
