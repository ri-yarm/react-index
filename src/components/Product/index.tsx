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
  const isSeen = (seen = seen ? 'Просмотрено' : '');

  function formatDate(dateString: string) {
    const date = new Date(dateString.replace(' ', ''));
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = (date.getFullYear() % 100).toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day}.${month}.${year} ${hours}:${minutes}`;
  }

  return (
    <article className="product">
      <div className="product__wrapper">
        {seen && <span className="product__seen">{isSeen}</span>}
        <img className="product__img" src={image} alt="" />
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
