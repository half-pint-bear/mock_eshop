import styles from './Loader.module.css';

export default function Loader({ text = "Chargement en cours..." }) {
    return (
        <div className={styles.progressLoaderWrapper}>
            <p className={styles.progressLoaderText}>{text}</p>
            <div className={styles.progressBarContainer}>
                <div className={styles.progressBar}></div>
            </div>
        </div>
    );
}
