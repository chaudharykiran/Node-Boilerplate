import HttpStatus from 'http-status-codes';
import { decodeBase64 } from '../../utils/storeImage';

import * as productService from './productServices';
import * as productImageService from './productImagesService';

/**
 * Get all products.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export async function fetchAll(req, res, next) {
  const { page = 1, limit = 10 } = req.query;
  const offSet = (page - 1) * limit;

  try {
    const products = await productService.getPaginatedProducts(limit, offSet);

    return res.status(HttpStatus.OK).json({
      page,
      limit,
      ...products
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Get a product by its id.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export async function fetchById(req, res, next) {
  try {
    const product = await productService.getProduct(req.params.id).then(product => product.toJSON());

    res.status(HttpStatus.OK).json({
      data: product
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Create a new product.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export async function create(req, res, next) {
  try {
    const newProduct = await productService.createProduct(req.body).then(newProduct => newProduct.toJSON());

    if (newProduct) {
      req.files.map(async file => {
        try {
          await productImageService.createProductImage(file.path, newProduct);
        } catch (error) {
          throw error;
        }
      });
    }

    const product = await productService.getProduct(newProduct.id);

    res.status(HttpStatus.CREATED).json({
      data: product
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Update a product.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export async function update(req, res, next) {
  try {
    const updatedProduct = await productService
      .updateProduct(req.params.id, req.body)
      .then(updatedProduct => updatedProduct.toJSON());

    res.status(HttpStatus.OK).json({
      data: updatedProduct
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Delete a product.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export async function deleteProduct(req, res, next) {
  try {
    await productService.deleteProduct(req.params.id);

    res.status(HttpStatus.NO_CONTENT).json({});
  } catch (error) {
    next(error);
  }
}

// /**
//  * Upload product image.
//  *
//  * @param {Object} req
//  * @param {Object} res
//  * @param {Function} next
//  */
// export async function uploadProductImage(req, res, next) {
//   try {
//     const image = req.body.image;
//     const filename = req.body.filename;

//     const isUploaded = await decodeBase64(image, filename);

//     if (isUploaded) {
//       res.status(HttpStatus.CREATED).json({
//         src: isUploaded
//       });
//     }
//   } catch (error) {
//     next(error);
//   }
// }
