
import express from 'express'
const router = express.Router()
import {
    createProduct,
    deleteProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct
} from '../controllers/productController.js'
import { userAuthentication, userAuthorization } from '../middlewares/userAuth.js'
import { catchAsyncError, validateMongooseId } from '../middlewares/errorMiddleware.js'


router.get('/products', getAllProducts)
router.get('/product/:id', validateMongooseId, getSingleProduct)
router.post('/admin/product/new', createProduct)
router.patch('/admin/product/:id', updateProduct)
router.delete('/admin/product/:id', deleteProduct)
// router.post('/admin/product/new', userAuthentication, userAuthorization('admin'), createProduct)
// router.patch('/admin/product/:id', userAuthentication, userAuthorization('admin'), validateMongooseId, updateProduct)
// router.delete('/admin/product/:id', userAuthentication, userAuthorization('admin'), validateMongooseId, deleteProduct)


export const productRoute = router

