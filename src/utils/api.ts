import axios from 'axios';

const BASE_URL = 'https://testguru.ru/frontend-test/api/v1/items';
const IMAGE_URL = 'https://api.unsplash.com/photos'

export const images = async () => {
  const { data } = await axios.get(
    `${IMAGE_URL}?client_id=xUCATjhuz-w76RvvAZDVIJpG7ctNss4X4y1o5e7uWkU`
  );
  return data;
};

export const getOneImage = async () => {
  const { data } = await axios.get(
    `${IMAGE_URL}/random?client_id=xUCATjhuz-w76RvvAZDVIJpG7ctNss4X4y1o5e7uWkU`
  );

  return data;
};

export const products = async (currentPage: number) => {
  const { data } = await axios.get(
    // ! Тут не понятно, как возвращать именно 16 элементов как в макете. Бэк бы увидеть
    `${BASE_URL}?page=${currentPage}`
  );

  return data;
};

export const productPage = async (id: string) => {
  const { data } = await axios.get(`${BASE_URL}/${id}`);

  return data;
};
