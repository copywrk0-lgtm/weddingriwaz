export const assets = {
  hero: 'https://weddingriwaz.com/wp-content/uploads/2024/06/3E1A0109-copy-scaled.jpg',
  rohitAlt: 'https://weddingriwaz.com/wp-content/uploads/2024/06/A08I3540.webp',
  rohitWedding: 'https://weddingriwaz.com/wp-content/uploads/2024/07/Z25A1696-copy-scaled.webp',
  vipulOne: 'https://weddingriwaz.com/wp-content/uploads/2024/06/All-Edit-Pic-2-scaled.webp',
  vipulTwo: 'https://weddingriwaz.com/wp-content/uploads/2024/06/All-Edit-Pic-3-scaled.webp',
  prernaOne: 'https://weddingriwaz.com/wp-content/uploads/2024/06/4P2A0528-copy-f-scaled.webp',
  prernaTwo: 'https://weddingriwaz.com/wp-content/uploads/2024/06/4P2A9950_1-copy-scaled.webp',
  rashiOne: 'https://weddingriwaz.com/wp-content/uploads/2024/06/1C0A6751-copy-scaled.webp',
  brideBW: 'https://weddingriwaz.com/wp-content/uploads/2024/06/Z25A5693-copy-scaled.webp',
  brideWarm: 'https://weddingriwaz.com/wp-content/uploads/2024/06/Z25A5723-copy-scaled.webp',
  blue: 'https://weddingriwaz.com/wp-content/uploads/2024/05/A08I7532-scaled.webp',
  library: 'https://weddingriwaz.com/wp-content/uploads/2024/05/A08I28711-scaled.webp',
  mono: 'https://weddingriwaz.com/wp-content/uploads/2024/05/A37I8062-copy-scaled.webp',
  pink: 'https://weddingriwaz.com/wp-content/uploads/2024/05/A37I8440-copy-scaled.webp',
  wedding: 'https://weddingriwaz.com/wp-content/uploads/2024/06/A37I8438-copy-scaled-1.jpg'
} as const;

export const stories = [
  { no: '01', name: 'Rohit × Suman', image: assets.hero, note: 'selected story / river / red' },
  { no: '02', name: 'Vipul × Sacchi', image: assets.vipulTwo, note: 'pre-wedding / colour / daylight' },
  { no: '03', name: 'Prerna × Ankit', image: assets.prernaTwo, note: 'evening / intimacy / light' },
  { no: '04', name: 'Rashi × Kshitij', image: assets.rashiOne, note: 'wedding / ritual / colour' }
] as const;

export const services = [
  ['01', 'Photography', 'Quiet gestures, loud celebrations, and everything between.', assets.brideWarm],
  ['02', 'Films', 'Movement, voices and moments that photographs cannot hold.', assets.wedding],
  ['03', 'Pre-Weddings', 'Portraits made around the couple, not a preset.', assets.blue],
  ['04', 'Destinations', 'Stories carried beyond the city.', assets.prernaTwo]
] as const;
