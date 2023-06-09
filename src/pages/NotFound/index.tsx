import styles from './NotFound.module.less'

const NotFound: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>ОБЪЯВЛЕНИЙ НЕ НАЙДЕНО</h1>
      <p className={styles.subtitle}>
        Простите, по вашему запросу товаров сейчас нет. Задайте запрос
        по-другому или измените характеристики
      </p>
    </div>
  );
};

export default NotFound;
