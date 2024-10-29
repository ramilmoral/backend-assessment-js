import moment from 'moment';
import { TDeleteProductRequest, TProduct } from '../types';
import { formatData, getData, getProductData } from '../configs';
import { ProductService } from '../services';

/**
 * mapped object of products
 * @param products TProduct[]
 */
const mappedProduct = (products: TProduct[]) => {
  return products.map((product) => ({
    ProductID: product.id,
    Title: product.title,
    Tags: product.tags,
    CreatedAt: moment(product.created_at).toString(),
    UpdatedAt: moment(product.updated_at).toString(),
    ProductCode: product.sku,
  }));
};

export class ProductsController {
  static async get(): Promise<Response> {
    const data = await getData();
    const transformedProducts = formatData(data);

    await ProductService.createBulk(transformedProducts);

    return Response.json({
      message: 'Third Party Data has been added to the DB.',
    });
  }

  static async create(): Promise<Response> {
    const data = await getProductData();
    const transformedProducts = formatData(data);

    await ProductService.createBulk(transformedProducts);

    const products = await ProductService.getByIds(
      transformedProducts.map((d) => d.id)
    );

    const parsedProducts = mappedProduct(products);

    return Response.json({
      message: 'Products Created',
      products: parsedProducts,
    });
  }

  static async update(): Promise<Response> {
    const products = await ProductService.getAll();

    const result = [];
    for (const product of products) {
      let updatedProduct = product;

      if (!product.title.includes(product.sku)) {
        updatedProduct = await ProductService.updateProductById(product.id, {
          title: `${product.title} ${product.sku}`,
        });
      }

      result.push(updatedProduct);
    }

    const parsedResult = mappedProduct(result);

    return Response.json({
      message: 'Products Updated',
      products: parsedResult,
    });
  }

  static async delete({
    product_id,
  }: TDeleteProductRequest): Promise<Response> {
    const product = await ProductService.getById(product_id);

    if (!product) console.error(400, 'Product not found.');

    await ProductService.delete(product_id);

    return Response.json({ message: 'Product has been successfully deleted.' });
  }
}
