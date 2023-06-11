import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchProducts,
  fetchImages,
  selectProduct,
} from "../../redux/slices/productSlice";

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
  const dispatch = useDispatch();
  const { products, images, status } = useSelector(selectProduct);
  console.log(status);

  const [isSpinner, setIsSpinner] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [alternativeView, setAlternativeView] = React.useState(false);

  /** Делаем запрос к серверу через редакс */
  const fetchAndUseProducts = async (page) => {
    setIsSpinner(true);
    try {
      await Promise.all([
        dispatch(fetchProducts( page )),
        dispatch(fetchImages())
      ]);
      setIsSpinner(false);
    } catch (error) {
      console.error(error);
      setIsError(true);
    }
  };

  /** Увеличиваем стейт страницы и вызываем получение новых данных */
  const clickMore = async () => {
    const nextPage = currentPage + 1;
    await setCurrentPage(nextPage);

    // Если ошибка уменьшаем стейт, что бы при
    // повторной ошибке получить данные, получать ту странницу
    // которая нужна
    if (isError) {
      setCurrentPage((prevPage) => prevPage - 1);
      setIsError(false);
      
      return fetchAndUseProducts({ currentPage: nextPage });
    }
  
    fetchAndUseProducts({ currentPage: nextPage }); 
  };
  
  /** При первой загрузке получаем начальную страницу и ставим скелетонов */
  React.useEffect(() => {
    (async () => {
      try {
        await fetchAndUseProducts({currentPage});
      } catch (error) {
        console.error(error);
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
    status === 'loading' || products.length === 0 ? skeleton : elements;

  // Если массив продуктов и нет ошибки и нет загрузки, рисуем 404
  // ? Рисуется только если например изначально загружается 20 страница
  if ( products === 0 && !isError && status === 'success') {
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
