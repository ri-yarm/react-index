import React from 'react';

import Product from '../../components/Product';
import Skeleton from '../../components/Product/Skeleton';
import ScrollToTopButton from '../../components/ButtonScrollToTop';

import * as api from '../../utils/api';

import NotFound from '../NotFound';
import Error from '../../components/Error';
import ButtonMore from '../../components/ButtonMore';

import './Home.less';

const Home: React.FC = () => {
  const [products, setProducts] = React.useState([]);
  const [images, setImages] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSpinner, setIsSpinner] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState<number>(1);

  const fetchData = async (page) => {
    setIsSpinner(true);
    try {
      const image = await api.images();
      setImages((prev) => [...prev, ...image]);

      const { items } = await api.products(page);
      setProducts((prev) => [...prev, ...items]);

      setIsSpinner(false);
    } catch (error) {
      console.error(error, 'error');
      setIsError(true);
    }
  };

  const clickMore =  () => {
    // setCurrentPage((prevPage) => prevPage + 1);
    const nextPage = currentPage + 1
    setCurrentPage(nextPage)
    
    if (isError) {
      setCurrentPage((prevPage) => prevPage - 1);
      setIsError(false);
      
      return fetchData();
    }

    fetchData(nextPage);
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

          <ButtonMore
            clickMore={clickMore}
            currentPage={currentPage}
            isSpinner={isSpinner}
          />
        </>
      )}
    </main>
  );
};

export default Home;
