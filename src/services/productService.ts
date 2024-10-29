import { TProduct } from '../types';
import { DB } from '../configs';

export class ProductService {
  static async getAll(): Promise<TProduct[]> {
    const products = await DB.sql<TProduct[]>`SELECT * FROM products;`;

    return products;
  }

  static async getById(id: number): Promise<TProduct> {
    const [product]: TProduct[] =
      await DB.sql`SELECT * FROM products WHERE id = ${id};`;

    return product;
  }

  static async getByIds(ids: number[]): Promise<TProduct[]> {
    const product: TProduct[] =
      await DB.sql`SELECT * FROM products WHERE id in ${DB.sql(ids)};`;

    return product;
  }

  static async updateProductById(
    id: number,
    data: Partial<TProduct>
  ): Promise<TProduct> {
    const columns = Object.keys(data) as Array<keyof TProduct>;
    const product: TProduct[] = await DB.sql`UPDATE products SET ${DB.sql(
      data,
      columns
    )}, updated_at = ${DB.sql`now()`} WHERE id = ${id} RETURNING *;`;

    return product[0];
  }

  static async createBulk(products: TProduct[]): Promise<TProduct[]> {
    const columns = Object.keys(products[0]) as Array<keyof TProduct>;
    const result: TProduct[] = await DB.sql`INSERT INTO products ${DB.sql(
      products,
      columns
    )} ON CONFLICT (id) DO NOTHING;`;

    return result;
  }

  static async delete(id: number): Promise<boolean> {
    await DB.sql`DELETE FROM products WHERE id=${id}`;

    return true;
  }
}
