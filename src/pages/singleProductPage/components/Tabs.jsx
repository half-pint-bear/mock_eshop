import styles from '../styles/Tabs.module.css';

export default function Tabs({ tabs, activeTab, onTabChange }) {
    return (
        <div className={styles.tabs}>
            <div className={styles.tabHeader}>
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        className={
                            activeTab === tab.key
                                ? `${styles.tabButton} ${styles.activeTab}`
                                : styles.tabButton
                        }
                        onClick={() => onTabChange(tab.key)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <div className={styles.tabContent}>
                {tabs.find((tab) => tab.key === activeTab)?.content}
            </div>
        </div>
    );
}
