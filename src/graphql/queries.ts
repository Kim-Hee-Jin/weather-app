import { gql } from '@apollo/client';

export const WEATHER_QUERY = gql`
  query Weather($city: String!) {
    current(city: $city) {
      dt
      name
      country
      main {
        temp
        feels_like
        temp_min
        temp_max
        pressure
        humidity
      }
      weather {
        description
        icon
      }
      wind {
        speed
        deg
      }
      sys {
        sunrise
        sunset
      }
    }
    forecast(city: $city) {
      population
      list {
        dt
        dt_txt
        main {
          temp
          feels_like
          temp_min
          temp_max
          pressure
          humidity
        }
        weather {
          description
          icon
        }
        wind {
          speed
          deg
        }
      }
    }
  }
`;
