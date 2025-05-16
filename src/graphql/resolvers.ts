import axios from 'axios';

const API_KEY = process.env.WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const resolvers = {
  Query: {
    current: async (_: any, { city }: { city: string }) => {
      try {
        const response = await axios.get(`${BASE_URL}/weather`, {
          params: {
            q: city,
            appid: API_KEY,
            units: 'metric'
          }
        });
        const data = response.data;
        console.log('OpenWeather current response: ', data);
        return {
          name: data.name,
          dt: data.dt,
          main: data.main,
          weather: data.weather,
          wind: data.wind,
          sys: {
            sunrise: data.sys.sunrise,
            sunset: data.sys.sunset,
          },
          country: data.sys.country,
        };
      } catch (error: any) {
        console.error('Error fetching current weather:', JSON.stringify(error, null, 2));
        if (error.response && error.response.data) {
          console.error('Error response data:', error.response.data);
        }
        throw new Error(`Could not fetch weather for ${city}`);
      }
    },
    forecast: async (_: any, { city }: { city: string }) => {
      try {
        const response = await axios.get(`${BASE_URL}/forecast`, {
          params: {
            q: city,
            appid: API_KEY,
            units: 'metric'
          }
        });
        const data = response.data;
        const population = data.city && data.city.population ? data.city.population : null;
        return {
          list: data.list.map((item: any) => ({
            dt: item.dt,
            dt_txt: item.dt_txt,
            main: item.main,
            weather: item.weather,
            wind: item.wind,
          })),
          population,
        };
      } catch (error) {
        console.error('Error fetching forecast:', error);
        throw new Error(`Could not fetch forecast for ${city}`);
      }
    },
  }
};

export default resolvers;
