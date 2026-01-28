export async function countriesLoader() {
  const response = await fetch(
    'https://restcountries.com/v3.1/region/europe'
  );

  if (!response.ok) {
    throw new Error('Error al cargar países');
  }

  return response.json();
}
