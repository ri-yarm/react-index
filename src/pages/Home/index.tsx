import React from 'react';

import Product from '../../components/Product';
import Skeleton from '../../components/Product/Skeleton';

import * as api from '../../utils/api';

import './Home.less';
import NotFound from '../NotFound';
import Error from '../../components/Error';

const Home: React.FC = () => {
  const [products, setProducts] = React.useState([]);
  const [images, setImages] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isError, setIsError] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState<number>(1);

  const clickMore = () => {
    if (isError) {
      return setCurrentPage(currentPage);
    }

    setCurrentPage(currentPage + 1);
    setIsError(false);
  };

  React.useEffect(() => {
    setIsLoading(true);

    (async () => {
      try {
        const image = await api.image();
        setImages((prev) => [...prev, ...image]);

        const { items } = await api.product(currentPage);
        setProducts((prev) => [...prev, ...items]);

        setIsLoading(false);
      } catch (error) {
        console.error(error, 'error');
        setIsError(true);
      }
    })();
  }, [currentPage]);

  const skeleton = [...Array(20)].map((_, index) => <Skeleton key={index} />);
  const elements = products.map((el, i) => (
    <Product
      key={el.id}
      {...el}
      image={images[i] ? images[i].urls.small_s3 : null}
    />
  ));
  const productElements = isLoading ? skeleton : elements;

  if (products.length === 0 && !isError) {
    return <NotFound />;
  }

  return (
    <main className="main">
      {isError ? (
        <Error clickMore={clickMore} />
      ) : (
        <>
          <section className="section">{productElements}</section>
          <button className="more" onClick={clickMore}>
            Показать еще
          </button>
        </>
      )}
    </main>
  );
};

export default Home;
