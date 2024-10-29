import { TProduct, TThirdPartyProduct } from '../types';

export const formatData = (data: TThirdPartyProduct[]): TProduct[] => {
  const products: TProduct[] = [];

  data.forEach((item) => {
    const variantProducts = formatProduct(item);
    products.push(...variantProducts);
  });

  return products;
};

export const formatProduct = (product: TThirdPartyProduct): TProduct[] => {
  return product.variants.map((d) => ({
    id: d.id,
    title: `${product.title} ${d.title}`,
    tags: product.tags,
    created_at: d.created_at,
    updated_at: d.updated_at,
    sku: d.sku,
  }));
};
