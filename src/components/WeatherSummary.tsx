import React from 'react';
import styles from '../styles/WeatherSummary.module.css';

interface WeatherSummaryProps {
    dateTime: string;
    city: string;
    country: string;
    population: number;
    temperature: number;
    description: string;
    feelsLike: number;
    wind: number;
    humidity: number;
    icon?: string;
}

const WeatherSummary: React.FC<WeatherSummaryProps> = ({
    dateTime,
    city,
    country,
    population,
    temperature,
    description,
    feelsLike,
    wind,
    humidity,
    icon,
}) => {
    return (
        <section className={styles.container}>
            <div className={styles.left}>
                <div className={styles.icon}>
                    {icon ? (
                        <img
                            src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                            alt={description}
                            width={48}
                            height={48}
                        />
                    ) : (
                        <span className={styles.iconPlaceholder} />
                    )}
                </div>
                <div className={styles.info}>
                    <time className={styles.date}>{formatSummaryDateTime(dateTime)}</time>
                    <h2 className={styles.city}>
                        {city}, {country} <small className={styles.population}>(인구수: {population})</small>
                    </h2>
                </div>
            </div>
            <div className={styles.right}>
                <p className={styles.temp}>{typeof temperature === 'number' ? temperature.toFixed(2) : '-'}°C</p>
                <small className={styles.description}>
                    Feels Like {typeof feelsLike === 'number' ? feelsLike.toFixed(2) : '-'}°C {description} 풍속 {typeof wind === 'number' ? wind : '-'}m/s 습도{typeof humidity === 'number' ? humidity : '-'}%
                </small>
            </div>
        </section>
    );
};

function formatSummaryDateTime(dateTime: string) {
    if (!dateTime) return '';
    // ISO 문자열 또는 일반 date string 모두 지원
    let date: Date;
    try {
        date = new Date(dateTime);
        if (isNaN(date.getTime())) return dateTime;
    } catch {
        return dateTime;
    }
    const month = date.toLocaleString('en-US', { month: 'short' });
    const day = date.getDate().toString().padStart(2, '0');
    const hour = date.getHours();
    const min = date.getMinutes().toString().padStart(2, '0');
    let hour12 = hour;
    const ampm = hour < 12 ? 'am' : 'pm';
    if (hour12 === 0) hour12 = 12;
    else if (hour12 > 12) hour12 -= 12;
    const hourStr = hour12.toString().padStart(2, '0');
    return `${month} ${day}. ${hourStr}:${min}${ampm}`;
}

export default WeatherSummary;