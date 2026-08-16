const API_URL = "https://api.unsplash.com";

const headers = {
  Authorization: `Client-ID ${process.env.UNSPLASH_TOKEN}`,
};

export async function getUnsplashData<T>(path: string): Promise<T> {
  const datos = await fetch(`${API_URL}/${path}?per_page=100`, {
    headers,
    next: {
      revalidate: 24 * 60 * 60,
    },
  });

  const json = await datos.json();

  return json;
}
