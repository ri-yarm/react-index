import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";

import { formatDate } from "../../utils/date";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import photo1 from "../../assets/photoForSlider1.jpg";
import photo2 from "../../assets/photoForSlider2.jpg";
import photo3 from "../../assets/photoForSlider3.jpg";

import defaultLike from "../../assets/defaultLikeButton.svg";
import likedButton from "../../assets/likedButton.svg";

import './Slider.less'
import styles from "./Product.module.less";

type ProductProps = {
  id: string;
  seen: boolean;
  price: number;
  title: string;
  address: string;
  about: string;
  createdAt: string;
  image: string;
  alternativeView: boolean;
};

const Product: React.FC<ProductProps> = ({
  id,
  seen,
  price,
  title,
  address,
  createdAt,
  image,
  alternativeView,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  /** конфиг для слайдера */
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    // добавляем ленивой загрузки для оптимизации
    lazyLoad: true,
    speed: 500,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: true,
    className: alternativeView && 'alternative-slider'
  };

  /** Записываем в хранилище ключ id со значением id */
  const handleLikeClick = () => {
    // если ключ есть, значит лайк стоит, удаляем ключ из хранилища и убираем лайк
    if (localStorage.getItem(id) === id) {
      setIsLiked(!isLiked);
      return localStorage.removeItem(id);
    }

    localStorage.setItem(id, id);
    setIsLiked(!isLiked);
  };

  /** Грузим лайки */
  useEffect(() => {
    if (localStorage.getItem(id) === id) {
      setIsLiked(true);
    }
  }, []);

  return (
    <article
      className={`${
        alternativeView ? styles.product_alternative : styles.product
      }`}
    >
      <div className={styles.wrapper}>
        {seen && <span className={styles.seen}>Просмотрено</span>}
        <Link className={styles.Link} to={`items/:${id}`}>
          {/* @ts-ingore */}
          <Slider {...settings}>
            <div>
              <img className={styles.img} src={image} alt={` ${title}.`} />
            </div>
            <div>
              <img className={styles.img} src={photo1} alt={` ${title}.`} />
            </div>
            <div>
              <img className={styles.img} src={photo2} alt={` ${title}.`} />
            </div>
            <div>
              <img className={styles.img} src={photo3} alt={` ${title}.`} />
            </div>
          </Slider>
        </Link>
        <div className={styles.info}>
          <div className={styles.header}>
            <div className="row">
              <h4 className={styles.price}>{Math.ceil(price)} ₽</h4>
              <button onClick={handleLikeClick} className={styles.like}>
                <img
                  className={styles.like_img}
                  src={isLiked ? likedButton : defaultLike}
                  alt=""
                />
              </button>
            </div>
          </div>
          <h3 className={styles.title}>{title}</h3>
          <div className={styles.footer}>
            <div className="row">
              <p className={styles.city}>{address}</p>
              <p className={styles.date}>{formatDate(createdAt)}</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Product;
