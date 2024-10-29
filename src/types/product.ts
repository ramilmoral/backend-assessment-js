export type TProduct = {
  id: number;
  title: string;
  tags: string;
  created_at: string;
  updated_at: string;
  sku: string;
};

type IThirdPartyProductVariant = {
  id: number;
  title: string;
  sku: string;
  created_at: string;
  updated_at: string;
};

export type TThirdPartyProduct = {
  title: string;
  tags: string;
  variants: IThirdPartyProductVariant[];
};

export type TThirdPartyResponse = {
  products: TThirdPartyProduct[];
};

export type TDeleteProductRequest = {
  product_id: number;
} & Request;
