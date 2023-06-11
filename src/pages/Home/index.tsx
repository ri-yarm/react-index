import React from "react";

import Product from "../../components/Product";
import Skeleton from "../../components/Product/Skeleton";
import ScrollToTopButton from "../../components/ButtonScrollToTop";

import * as api from "../../utils/api";

import NotFound from "../NotFound";
import Error from "../../components/Error";
import ButtonMore from "../../components/ButtonMore";

import "./Home.less";
import ElementView from "../../components/ElementView";
import Header from "../../components/Header";

const Home: React.FC = () => {
  const [products, setProducts] = React.useState([]);
  const [images, setImages] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSpinner, setIsSpinner] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [alternativeView, setAlternativeView] = React.useState(false);

  const fetchData = async (page: number) => {
    setIsSpinner(true);
    try {
      const image = await api.images();
      setImages((prev) => [...prev, ...image]);

      const { items } = await api.products(page);
      setProducts((prev) => [...prev, ...items]);

      setIsSpinner(false);
    } catch (error) {
      console.error(error, "error");
      setIsError(true);
    }
  };

  const clickMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);

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
        console.error(error, "error");

        setIsError(true);
      }
    })();
  }, []);

  // Рисуем скелетоны
  const skeleton = [...Array(20)].map((_, index) => (
    <Skeleton alternativeView={alternativeView} key={index} />
  ));
  // Сами элементы
  const elements = products.map((el, i) => {
    return (
      <Product
        key={el.id}
        alternativeView={alternativeView}
        {...el}
        image={images[i] ? images[i].urls.small_s3 : null}
      />
    );
  });

  // если загрузка или пока массив продуктов равен нулю рисуем скелетоны
  const productElements =
    isLoading || products.length === 0 ? skeleton : elements;

  // Если массив продуктов и нет ошибка и нет загрузки, рисуем 404
  // ? Рисуется только если например изначально загружается 20 страница
  if (products.length === 0 && !isError && !isLoading) {
    return <NotFound />;
  }

  return (
    <>
      <main className="main">
      <Header />
        <ElementView
          setAlternativeView={setAlternativeView}
          alternativeView={alternativeView}
        />
        {isError ? (
          <Error clickMore={clickMore} />
        ) : (
          <>
            <section
              className={`${
                alternativeView ? "section-alternative" : "section"
              }`}
            >
              {productElements}
            </section>
            <ScrollToTopButton />

            <ButtonMore
              clickMore={clickMore}
              currentPage={currentPage}
              isSpinner={isSpinner}
            />
          </>
        )}
      </main>
    </>
  );
};

export default Home;
