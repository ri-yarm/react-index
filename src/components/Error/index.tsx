import styles from './Error.module.less'

const Error = ({clickMore}) => {
  return (
    <div className={styles.container}>
      <p>Ошибка при загрузке</p>
      <button className="more" onClick={clickMore}>
        Повторить попытку
      </button>
    </div>
  );
};

export default Error;
