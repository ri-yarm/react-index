import { Link } from 'react-router-dom';

import { formatDate } from '../../utils/date';

import './Product.less';

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
  about,
  createdAt,
  image,
}) => {
  

  return (
    <article className="product">
      <div className="product__wrapper">
        {seen && <span className="product__seen">Просмотрено</span>}
        <Link to={`items/:${id}`}>
          <img className="product__img" src={image} alt="" />
        </Link>
        <div className="product__info">
          <div className="product__header">
            <div className="row">
              <h4 className="product__price">{Math.ceil(price)} ₽</h4>
              <button className="product__like"></button>
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
