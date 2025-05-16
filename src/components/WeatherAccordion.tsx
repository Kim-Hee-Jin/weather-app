import { useState } from 'react';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';
import styles from '../styles/WeatherAccordion.module.css';

interface WeatherAccordionProps {
    title: string;
    children: React.ReactNode;
}

const WeatherAccordion: React.FC<WeatherAccordionProps> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={styles.accordion}>
            <button className={styles.toggle} onClick={() => setIsOpen(!isOpen)}>
                <span>{title}</span>
                <span className={styles.icon}>
                    {isOpen ? <FiChevronUp /> : <FiChevronDown />}
                </span>
            </button>
            {isOpen && <div className={styles.content}>{children}</div>}
        </div>
    );
};

export default WeatherAccordion;