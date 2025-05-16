import React from 'react';
import styles from '../styles/WeatherHeader.module.css';
import globeImage from '../assets/globe.png';

interface WeatherHeaderProps {
    city: string;
}

const WeatherHeader: React.FC<WeatherHeaderProps> = ({ city }) => {
    return (
        <header className={styles.header}>
            <img src={globeImage.src} alt="Earth with clouds img" className={styles.globe} />
            <h1 className={styles.title}>Weather Information for {city}</h1>
        </header>
    );
};

export default WeatherHeader;