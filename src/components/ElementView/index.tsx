import {useEffect, useState} from 'react'

import styles from './Element.module.less'

const ElementView = ({sectionRef}) => {
  const [defaultView, setDefaultView] = useState(true);
  const [alternativeView, setAlternativeView] = useState(false);

  useEffect(() => {
      sectionRef.current.classList.add('section-alternative')
      sectionRef.current.classList.add('section-alternative')
  }, [])

  return (
    <nav className={styles.nav}>
      <button>
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
      </button>
      <button>
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
      </button>
    </nav>
  );
};

export default ElementView;
