import React from 'react';
import { useQuery } from '@apollo/client';
import { WEATHER_QUERY } from '../graphql/queries';
import { useRouter } from 'next/router';
import WeatherHeader from '../components/WeatherHeader';
import WeatherSummary from '../components/WeatherSummary';
import WeatherAccordion from '../components/WeatherAccordion';
import HourlyWeatherList from '../components/HourlyWeatherList';
import styles from '../styles/City.module.css';


function groupForecastByDate(list: any[]) {
  const grouped: { [date: string]: any[] } = {};
  list.forEach(item => {
    const date = item.dt_txt.split(' ')[0];
    if (!grouped[date]) grouped[date] = [];
    grouped[date].push(item);
  });
  return grouped;
}

function formatLocalDateTime(dt: number, timezone?: number) {
  if (!dt) return '-';
  let time = dt * 1000;
  if (typeof timezone === 'number') {
    time += timezone * 1000;
  }
  const date = new Date(time);
  return date.toISOString();
}

const CityWeather: React.FC = () => {
  const router = useRouter();
  const { city } = router.query;
  const { data, loading, error } = useQuery(WEATHER_QUERY, {
    variables: { city: city as string },
    skip: !city,
  });

  if (loading) return <div className={styles.loading}>로딩 중...</div>;
  if (error) return <div className={styles.loading}>데이터를 불러올 수 없습니다.<br/>({error.message})</div>;
  if (!data || !data.current || !data.forecast) return <div className={styles.loading}>날씨 정보를 찾을 수 없습니다.</div>;

  const { current, forecast } = data;
  const grouped = groupForecastByDate(forecast.list);
  const dates = Object.keys(grouped);

  return (
    <div className={styles.container}>
      <WeatherHeader city={current.name} />
      <WeatherSummary
        dateTime={formatLocalDateTime(current.dt, current.timezone)}
        city={current.name || '-'}
        country={current.country || '-'}
        population={typeof forecast.population === 'number' ? forecast.population : 0}
        temperature={typeof current.main?.temp === 'number' ? current.main.temp : '-'}
        description={current.weather?.[0]?.description || '-'}
        feelsLike={typeof current.main?.feels_like === 'number' ? current.main.feels_like : '-'}
        wind={typeof current.wind?.speed === 'number' ? current.wind.speed : '-'}
        humidity={typeof current.main?.humidity === 'number' ? current.main.humidity : '-'}
        icon={current.weather?.[0]?.icon || ''}
      />
      <div className={styles.forecastCard}>
        <div className={styles.forecastTitle}>5-day Forecast</div>
        {dates.slice(0, 5).map(date => (
          <WeatherAccordion key={date} title={new Date(date).toLocaleDateString('en-US', { month: 'short', day: '2-digit' })}>
            <HourlyWeatherList
              hourlyData={grouped[date].map((item: any) => ({
                time: item.dt_txt.split(' ')[1].slice(0, 5),
                temperature: item.main.temp,
                max: item.main.temp_max,
                description: item.weather[0]?.description,
                icon: item.weather[0]?.icon ?? '',
              }))}
            />
          </WeatherAccordion>
        ))}
      </div>
    </div>
  );
};

export default CityWeather;
