import { AutoRouter, cors } from 'itty-router';
import { ProductsController } from '../controllers';
import {
  dbConnect,
  logError,
  logRequest,
  logResponse,
  validateApiKey,
} from '../middleware';

const { preflight, corsify } = cors();

export const router = AutoRouter({
  before: [preflight, logRequest, validateApiKey, dbConnect],
  finally: [logResponse, corsify],
  catch: logError,
});

router.get('/api/products', ProductsController.get);
router.post('/api/products', ProductsController.create);
router.put('/api/products', ProductsController.update);
router.delete('/api/products/:product_id', ProductsController.delete);
