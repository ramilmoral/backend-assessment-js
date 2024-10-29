import { TThirdPartyResponse } from '../types';

export const getData = async () => {
  const response = await fetch(
    'https://02557f4d-8f03-405d-a4e7-7a6483d26a04.mock.pstmn.io/get'
  );

  const { products } = (await response.json()) as TThirdPartyResponse;

  return products;
};

export const getProductData = async () => {
  const response = await fetch(
    'https://02557f4d-8f03-405d-a4e7-7a6483d26a04.mock.pstmn.io/getProducts'
  );

  const { products } = (await response.json()) as TThirdPartyResponse;

  return products;
};
