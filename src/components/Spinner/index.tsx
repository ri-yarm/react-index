import styles from './Spinner.module.less';

const Spinner = ({ isVisible }) =>
  isVisible ? (
    <svg
      width="34"
      height="34"
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.spinner}
    >
      <path
        opacity="0.3"
        d="M33.4814 16.7778C33.4814 26.003 26.0029 33.4815 16.7777 33.4815C7.55248 33.4815 0.0739746 26.003 0.0739746 16.7778C0.0739746 7.55263 7.55248 0.0741272 16.7777 0.0741272C26.0029 0.0741272 33.4814 7.55263 33.4814 16.7778ZM5.28247 16.7778C5.28247 23.1265 10.429 28.273 16.7777 28.273C23.1263 28.273 28.2729 23.1265 28.2729 16.7778C28.2729 10.4292 23.1263 5.28262 16.7777 5.28262C10.429 5.28262 5.28247 10.4292 5.28247 16.7778Z"
        fill="#ABCFD0"
      />
      <path
        d="M30.8771 16.7778C32.3154 16.7778 33.5021 15.6049 33.2788 14.1841C33.0743 12.8831 32.7162 11.6079 32.2099 10.3856C31.3704 8.35901 30.1401 6.51761 28.589 4.96653C27.0379 3.41545 25.1965 2.18506 23.1699 1.34562C21.9476 0.839324 20.6724 0.481223 19.3714 0.276731C17.9506 0.0533947 16.7777 1.24009 16.7777 2.67838C16.7777 4.11666 17.9582 5.2533 19.3597 5.57636C19.979 5.71911 20.5868 5.9133 21.1767 6.15764C22.5714 6.73533 23.8386 7.58206 24.906 8.64949C25.9734 9.71692 26.8202 10.9841 27.3979 12.3788C27.6422 12.9687 27.8364 13.5765 27.9791 14.1958C28.3022 15.5973 29.4388 16.7778 30.8771 16.7778Z"
        fill="#ABCFD0"
      />
    </svg>
  ) : null;

export default Spinner;
