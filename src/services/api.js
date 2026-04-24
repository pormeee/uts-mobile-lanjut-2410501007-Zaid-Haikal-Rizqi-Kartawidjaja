const BASE_URL = "https://api.tvmaze.com";

export const getShows = async () => {
  try {
    const response = await fetch(`${BASE_URL}/shows`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};