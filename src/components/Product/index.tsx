import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";

import { formatDate } from "../../utils/date";

import "./Product.less";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import photo1 from "../../assets/photoForSlider1.jpg";
import photo2 from "../../assets/photoForSlider2.jpg";
import photo3 from "../../assets/photoForSlider3.jpg";

import defaultLike from "../../assets/defaultLikeButton.svg";
import likedButton from "../../assets/likedButton.svg";

type ProductProps = {
  id: string;
  seen: boolean;
  price: number;
  title: string;
  address: string;
  about: string;
  createdAt: string;
  image: string;
};

const Product: React.FC<ProductProps> = ({
  id,
  seen,
  price,
  title,
  address,
  createdAt,
  image,
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
    <article className="product">
      <div className="product__wrapper">
        {seen && <span className="product__seen">Просмотрено</span>}
        <Link to={`items/:${id}`}>
          <Slider {...settings}>
            <div>
              <img className="product__img" src={image} alt={` ${title}.`} />
            </div>
            <div>
              <img className="product__img" src={photo1} alt={` ${title}.`} />
            </div>
            <div>
              <img className="product__img" src={photo2} alt={` ${title}.`} />
            </div>
            <div>
              <img className="product__img" src={photo3} alt={` ${title}.`} />
            </div>
          </Slider>
        </Link>
        <div className="product__info">
          <div className="product__header">
            <div className="row">
              <h4 className="product__price">{Math.ceil(price)} ₽</h4>
              <button onClick={handleLikeClick} className="product__like">
                <img
                  className="like_img"
                  src={isLiked ? likedButton : defaultLike}
                  alt=""
                />
              </button>
            </div>
          </div>
          <h3 className="product__title">{title}</h3>
          <div className="product__footer">
            <div className="row">
              <p className="product__city">{address}</p>
              <p className="product__date">{formatDate(createdAt)}</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Product;
