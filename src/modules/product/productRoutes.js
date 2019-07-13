import { Router } from 'express';
import multer from 'multer';

import * as productController from './productController';

// import { findproduct, productValidator } from '../validators/productValidator';

const router = Router();

const STORAGE_URI = `${__dirname}/../../../upload/`;
const upload = multer({ dest: STORAGE_URI });
const MAX_COUNT = 10;

/**
 * GET <
 */
router.get('/', productController.fetchAll);

/**
 * GET /api/products/:id
 */
router.get('/:id', productController.fetchById);

/**
 * POST /api/products
 */
router.post('/', upload.array('productImages', MAX_COUNT), productController.create);

/**
 * PUT /api/products/:id
 */
router.put('/:id', upload.array('productImages', MAX_COUNT), productController.update);

/**
 * DELETE /api/products/:id
 */
router.delete('/:id', productController.deleteProduct);

/**
 * POST /api/products/upload/image
 */
// router.post('/upload/image', productController.uploadProductImage);

export default router;
