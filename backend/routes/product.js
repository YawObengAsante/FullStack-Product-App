import express from 'express'
import {createProduct, deleteProduct, getAllProducts, updateProduct} from '../controllers/product.js'

const router = express.Router()

router.route('/').get(getAllProducts).post(createProduct)
router.route('/:id').put(updateProduct).delete(deleteProduct)

export default router