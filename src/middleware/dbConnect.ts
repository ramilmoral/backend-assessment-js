import { Env } from '..';
import { DB } from '../configs';

export const dbConnect = (_request: Request, env?: Env) => {
  DB.connect(env!);
  return;
};
