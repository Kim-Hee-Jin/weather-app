import { gql } from 'apollo-server-micro';

const typeDefs = gql`
  type Weather {
    description: String
    icon: String
  }

  type MainWeatherData {
    temp: Float
    feels_like: Float
    temp_min: Float
    temp_max: Float
    pressure: Int
    humidity: Int
  }

  type WindData {
    speed: Float
    deg: Int
  }

  type SunData {
    sunrise: Int
    sunset: Int
  }

  type CurrentWeather {
    dt: Int
    name: String
    main: MainWeatherData
    weather: [Weather]
    wind: WindData
    sys: SunData
    country: String
  }

  type ForecastItem {
    dt: Int
    dt_txt: String
    main: MainWeatherData
    weather: [Weather]
    wind: WindData
  }

  type Forecast {
    list: [ForecastItem]
    population: Int
  }

  type Query {
    current(city: String!): CurrentWeather
    forecast(city: String!): Forecast
  }
`;

export default typeDefs;
