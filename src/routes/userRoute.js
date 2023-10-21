
import { deleteUserByAdmin, forgotUserPassword, getAllUsersByAdmin, getSingleUserDetailByAdmin, getUserDetail, loginUser, logoutUser, registerUser, resetUserPassword, updateUserByAdmin, updateUserPassword, updateUserProfile } from '../controllers/userController.js'
import { userAuthentication, userAuthorization } from '../middlewares/userAuth.js'
import express from 'express'
const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/logout', logoutUser)           
router.post('/forgot/password', forgotUserPassword)
router.post('/reset/password/:token', resetUserPassword)
router.get('/profile', userAuthentication, getUserDetail)
router.patch('/update/password', userAuthentication, updateUserPassword)
router.patch('/update/profile', userAuthentication, updateUserProfile)
router.get('/admin/users', userAuthentication, userAuthorization('admin'), getAllUsersByAdmin)
router.get('/admin/user/:id', userAuthentication, userAuthorization('admin'), getSingleUserDetailByAdmin)
router.patch('/admin/user/:id', userAuthentication, userAuthorization('admin'), updateUserByAdmin)
router.delete('/admin/user/:id', userAuthentication, userAuthorization('admin'), deleteUserByAdmin)


export const userRoute = router