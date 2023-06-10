import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { productPage, getOneImage } from '../../utils/api';
import { formatDate } from '../../utils/date';

import styles from './ProductPage.module.less';
import NotFound from '../NotFound';

const ProductPage: React.FC = () => {
  const { id } = useParams();

  const [isError, setIsError] = useState(false);
  const [image, setImage] = useState();
  const [product, setProduct] = useState<{
    seen: boolean;
    title: string;
    price: number;
    address: string;
    createdAt: string;
  }>();

  useEffect(() => {
    (async () => {
      try {
        const dataProduct = await productPage(id?.substring(1));
        const { urls } = await getOneImage();

        setProduct(dataProduct);
        setImage(urls.small);
      } catch (error) {
        console.error(error);
        setIsError(true);
      }
    })();
  }, [id]);

  if (isError) {
    return <NotFound />;
  }

  return (
    <main className={styles.main}>
      <Link to="/">
        <button className={styles.back}>Вернуться назад</button>
      </Link>
      <section>
        <img src={image || ''} alt={`${product?.title || ''}.`} />
        <div className={styles.info}>
          <h2>{product?.title}</h2>
          <h3>{Math.ceil(product?.price || 0)} ₽</h3>
          <p>{product?.about}</p>
          <h4>
            {product?.createdAt &&
              `Создано : ${formatDate(product?.createdAt)}`}
          </h4>
          <button>Купить</button>
        </div>
      </section>
    </main>
  );
};

export default ProductPage;
