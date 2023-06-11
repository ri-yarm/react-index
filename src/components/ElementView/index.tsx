import { useEffect } from "react";

import styles from "./Element.module.less";

type ElementViewProps = {
  setAlternativeView: (arg: boolean) => void;
  alternativeView: boolean;
}

const ElementView: React.FC<ElementViewProps> = ({ setAlternativeView, alternativeView }) => {

  const clickDefaultView = () => {
    setAlternativeView(false);
    localStorage.setItem('alternativeView', 'false')
  };

  const clickAlternativeView = () => {
    setAlternativeView(true);
    localStorage.setItem('alternativeView', 'true')
  };

  useEffect(() => {
    const isView = localStorage.getItem('alternativeView')
    if(isView === 'true') {
      return setAlternativeView(true)
    }
  }, [])

  return (
    <nav className={styles.nav}>
      <button disabled={!alternativeView} onClick={clickDefaultView}>
        {alternativeView ? (
          <svg
            width="31"
            height="31"
            viewBox="0 0 31 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="1.1"
              y="1.1"
              width="11.8"
              height="11.8"
              rx="1.9"
              stroke="#C7C7C7"
              strokeWidth="2.2"
            />
            <rect
              x="18.1"
              y="1.1"
              width="11.8"
              height="11.8"
              rx="1.9"
              stroke="#C7C7C7"
              strokeWidth="2.2"
            />
            <rect
              x="1.1"
              y="18.1"
              width="11.8"
              height="11.8"
              rx="1.9"
              stroke="#C7C7C7"
              strokeWidth="2.2"
            />
            <rect
              x="18.1"
              y="18.1"
              width="11.8"
              height="11.8"
              rx="1.9"
              stroke="#C7C7C7"
              strokeWidth="2.2"
            />
          </svg>
        ) : (
          <svg
            width="31"
            height="31"
            viewBox="0 0 31 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="1.1"
              y="1.1"
              width="11.8"
              height="11.8"
              rx="1.9"
              stroke="#00A0AB"
              strokeWidth="2.2"
            />
            <rect
              x="18.1"
              y="1.1"
              width="11.8"
              height="11.8"
              rx="1.9"
              stroke="#00A0AB"
              strokeWidth="2.2"
            />
            <rect
              x="1.1"
              y="18.1"
              width="11.8"
              height="11.8"
              rx="1.9"
              stroke="#00A0AB"
              strokeWidth="2.2"
            />
            <rect
              x="18.1"
              y="18.1"
              width="11.8"
              height="11.8"
              rx="1.9"
              stroke="#00A0AB"
              strokeWidth="2.2"
            />
          </svg>
        )}
      </button>
      <button disabled={alternativeView} onClick={clickAlternativeView}>
        {alternativeView ? (
          <svg
            width="31"
            height="31"
            viewBox="0 0 31 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="1.1"
              y="18.1"
              width="28.8"
              height="11.8"
              rx="1.9"
              stroke="#00A0AB"
              strokeWidth="2.2"
            />
            <rect
              x="1.1"
              y="1.1"
              width="28.8"
              height="11.8"
              rx="1.9"
              stroke="#00A0AB"
              strokeWidth="2.2"
            />
          </svg>
        ) : (
          <svg
            width="31"
            height="31"
            viewBox="0 0 31 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="1.1"
              y="18.1"
              width="28.8"
              height="11.8"
              rx="1.9"
              stroke="#C7C7C7"
              strokeWidth="2.2"
            />
            <rect
              x="1.1"
              y="1.1"
              width="28.8"
              height="11.8"
              rx="1.9"
              stroke="#C7C7C7"
              strokeWidth="2.2"
            />
          </svg>
        )}
      </button>
    </nav>
  );
};

export default ElementView;
