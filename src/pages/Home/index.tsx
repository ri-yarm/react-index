import React from 'react';

import Product from '../../components/Product';
import Skeleton from '../../components/Product/Skeleton';
import ScrollToTopButton from '../../components/ButtonScrollToTop';

import * as api from '../../utils/api';

import './Home.less';
import NotFound from '../NotFound';
import Error from '../../components/Error';

const Home: React.FC = () => {
  const [products, setProducts] = React.useState([]);
  const [images, setImages] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSpinner, setIsSpinner] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState<number>(1);

  const clickMore = () => {
    if (isError) {
      return (async () => {
        try {
          const image = await api.images();
          setImages((prev) => [...prev, ...image]);

          const { items } = await api.products(currentPage);
          setProducts((prev) => [...prev, ...items]);

          setIsLoading(false);
          setIsError(false);
        } catch (error) {
          console.error(error, 'error');
          setIsError(true);
        }
      })();
    }

    setCurrentPage(currentPage + 1);

    (async () => {
      try {
        const image = await api.images();
        setImages((prev) => [...prev, ...image]);

        const { items } = await api.products(currentPage);
        setProducts((prev) => [...prev, ...items]);

        setIsLoading(false);
      } catch (error) {
        console.error(error, 'error');
        setIsError(true);
      }
    })();

    setIsError(false);
  };

  React.useEffect(() => {
    setIsLoading(true);

    (async () => {
      try {
        const image = await api.images();
        setImages(image);

        const { items } = await api.products(currentPage);
        setProducts(items);

        setIsLoading(false);
      } catch (error) {
        console.error(error, 'error');

        setIsError(true);
      }
    })();
  }, []);

  const skeleton = [...Array(20)].map((_, index) => <Skeleton key={index} />);
  const elements = products.map((el, i) => (
    <Product
      key={el.id}
      {...el}
      image={images[i] ? images[i].urls.small_s3 : null}
    />
  ));
  const productElements =
    isLoading || products.length === 0 ? skeleton : elements;

  if (products.length === 0 && !isError && !isLoading) {
    return <NotFound />;
  }

  return (
    <main className="main">
      {isError ? (
        <Error clickMore={clickMore} />
      ) : (
        <>
          <section className="section">{productElements}</section>
          <ScrollToTopButton />

          {currentPage < 10 && (
            <button className="more" onClick={clickMore}>
              Показать еще
            </button>
          )}
        </>
      )}
    </main>
  );
};

export default Home;
