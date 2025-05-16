import React from 'react';
import styles from '../styles/WeatherRow.module.css';

interface WeatherRowProps {
    time: string;
    icon: string;
    temperature: number;
    max?: number;
    description: string;
}

const WeatherRow: React.FC<WeatherRowProps> = ({
    time,
    icon,
    temperature,
    max,
    description
}) => {
    return (
        <div className={styles.card}>
            <div className={styles.left}>
                <div className={styles.icon}>
                  {icon ? (
                    <img
                      src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                      alt={description}
                      width={60}
                      height={60}
                    />
                  ) : (
                    <span style={{width: 60, height: 60, display: 'inline-block', background: '#eee', borderRadius: '50%'}} />
                  )}
                </div>
            </div>
            <div className={styles.center}>
                <div className={styles.time}>{formatTimeWithAmPm(time)}</div>
            </div>
            <div className={styles.right}>
                <div className={styles.desc} style={{ fontSize: 13, color: '#888', marginBottom: 2 }}>{description}</div>
                <div className={styles.tempSet}>
                  <span>{typeof temperature === 'number' ? temperature.toFixed(2) : '-'}°C</span>
                  {typeof max === 'number' && (
                    <span>
                      / {max.toFixed(2)}°C
                    </span>
                  )}
                </div>
            </div>
        </div>
    );
};

function formatTimeWithAmPm(time: string) {
    if (!time) return '';
    const [h, m] = time.split(':');
    let hour = Number(h);
    const ampm = hour < 12 ? 'am' : 'pm';
    if (hour === 0) hour = 12;
    else if (hour > 12) hour -= 12;
    const hourStr = hour.toString().padStart(2, '0');
    return `${hourStr}:${m}${ampm}`;
}

export default WeatherRow;