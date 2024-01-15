import countries from '@/config/countries';

export function getCountry(countryCode: string) {
  const country = countries.find(
    (country) => country.code.toLowerCase() === countryCode.toLowerCase()
  );

  if (!country) {
    return null;
  }

  return country;
}
