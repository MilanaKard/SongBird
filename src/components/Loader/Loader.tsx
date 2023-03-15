import styles from './Loader.module.scss';

const Loader = (): JSX.Element => {
  return <div className={styles.loader} data-testid="loader" />;
};

export default Loader;
