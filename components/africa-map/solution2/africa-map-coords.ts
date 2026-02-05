export interface CountryCoords {
  code: string
  name: { fr: string; en: string }
  flag: string
  projectCount: number
  xPercent: number
  yPercent: number
}

export const solution2Coordinates: CountryCoords[] = [
  {
    code: 'ss',
    name: { fr: 'Soudan du Sud', en: 'South Sudan' },
    flag: '🇸🇸',
    projectCount: 1,
    xPercent: 64.17,
    yPercent: 13.33
  },
  {
    code: 'bj',
    name: { fr: 'Bénin', en: 'Benin' },
    flag: '🇧🇯',
    projectCount: 1,
    xPercent: 41.67,
    yPercent: 36.67
  },
  {
    code: 'cm',
    name: { fr: 'Cameroun', en: 'Cameroon' },
    flag: '🇨🇲',
    projectCount: 2,
    xPercent: 47.5,
    yPercent: 43.33
  },
  {
    code: 'sn',
    name: { fr: 'Sénégal', en: 'Senegal' },
    flag: '🇸🇳',
    projectCount: 2,
    xPercent: 18.33,
    yPercent: 30.0
  },
  {
    code: 'gn',
    name: { fr: 'Guinée', en: 'Guinea' },
    flag: '🇬🇳',
    projectCount: 1,
    xPercent: 20.0,
    yPercent: 34.17
  },
  {
    code: 'mr',
    name: { fr: 'Mauritanie', en: 'Mauritania' },
    flag: '🇲🇷',
    projectCount: 1,
    xPercent: 16.67,
    yPercent: 18.33
  },
  {
    code: 'et',
    name: { fr: 'Éthiopie', en: 'Ethiopia' },
    flag: '🇪🇹',
    projectCount: 2,
    xPercent: 71.67,
    yPercent: 30.0
  },
  {
    code: 'so',
    name: { fr: 'Somalie', en: 'Somalia' },
    flag: '🇸🇴',
    projectCount: 2,
    xPercent: 77.5,
    yPercent: 36.67
  }
]
