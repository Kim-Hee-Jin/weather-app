import React from 'react';
import WeatherRow from './WeatherRow';
import styles from '../styles/HourlyWeatherList.module.css';

interface HourlyData {
    time: string;
    temperature: number;
    max?: number;
    description: string;
    icon: string; // icon code from API
}

interface HourlyWeatherListProps {
    hourlyData: HourlyData[];
}

const HourlyWeatherList: React.FC<HourlyWeatherListProps> = ({ hourlyData }) => {
    return (
        <div className={styles.listContainer}>
            {hourlyData.map((data, index) => (
                <WeatherRow
                    key={index}
                    time={data.time}
                    temperature={data.temperature}
                    max={data.max}
                    description={data.description}
                    icon={data.icon}
                />
            ))}
        </div>
    );
};

export default HourlyWeatherList;