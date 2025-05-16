import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Index.module.css';
import globeImage from '../assets/globe.png';
import { handleClientScriptLoad } from 'next/script';

const cities = ['Seoul', 'Tokyo', 'Paris', 'London'];

export default function IndexPage() {
  const router = useRouter();
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const handleCityClick = (city: string) => {
    setSelectedCity(city);
    router.push(`/${city}`);
  }

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1>
          <span className={styles.titleBlack}>Welcome to<br /></span>
          <span className={styles.titleRed}>Weather App!</span>
        </h1>
        <p className={styles.caption}>
          Choose a city from the list below to check the weather.
        </p>
      </header>

      <nav className={styles.cityNav}>
        {cities.map((city) => (
          <button
            key={city}
            className={`${styles.cityButton} ${
              selectedCity === city ? styles.selected : ""}`}
              onClick={() => {
              setSelectedCity(city);
              router.push(`/${city}`);
            }}
          >
            {city}
          </button>
        ))}
      </nav>

      <figure className={styles.globeContainer}>
        <img src={globeImage.src} alt="Earth with clouds img" className={styles.globe} />
      </figure>
    </main>
  );
}
