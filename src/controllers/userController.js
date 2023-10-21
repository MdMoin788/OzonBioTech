
import { User } from '../models/userModel.js'
import { ErrorHandler } from '../utils/errorHandler.js'
import { sendResponse, sendEmail } from '../utils/token.js'
import crypto from 'crypto'

export const registerUser = async (req, res, next) => {
    try {
        console.log('req.body', req.body)
        const { name, email, password } = req.body
        let user = await User.findOne({ email: email })
        if (user) return next(new ErrorHandler('User already exist', 409))
        user = await User.create({
            name,
            email,
            password,
            avatar: {
                id: 'sample id',
                url: 'sample url'
            }
        })
        const token = user.getJWTToken()
        sendResponse(res, token, user)

    } catch (error) {
        console.log('register user error', error)
        next(new ErrorHandler(error.message, 500))
    }
}

export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body
        if (!email || !password) return next(new ErrorHandler('Enter Email and Password', 400))
        const user = await User.findOne({ email: email })
        if (!user) return next(new ErrorHandler('User does not exist', 404))

        const isPasswordMatch = await user.comparePassword(password)
        if (!isPasswordMatch) return next(new ErrorHandler('Invalid Credentials', 401))

        const token = user.getJWTToken()        
        sendResponse(res, token, user)
    } catch (error) {
        next(new ErrorHandler(error.message, 500))
    }
}

export const logoutUser = async (req, res, next) => {
    try { 
        res.status(200)
        .cookie('jwtToken', null, {
            secure: false,
            expires: new Date(Date.now(-1)),
            httpOnly: true,
            
        }).json({ success: true, message: 'logged Out Successfully' })
    } catch (error) {
        console.log('logout user error', error)
        next(new ErrorHandler(error.message, 500))
    }
}



export const forgotUserPassword = async (req, res, next) => {
    let user
    try {
        user = await User.findOne({ email: req.body.email })
        if (!user) next(new ErrorHandler('User does not exist', 404))

        // Get reset password token
        const resetToken = user.getResetPasswordToken()
        await user.save({ validateBeforeSave: false })

        const resetPasswordUrl = `${req.protocol}://${req.get('host')}/api/v1/reset/password/${resetToken}`
        const message = `Your password reset token is : \n\n ${resetPasswordUrl} \n\n If you have not requested this email then please ignore it.`
        // console.log('message', message)
        await sendEmail({
            email: user.email,
            subject: `Ecommerce Password Recovery`,
            message: message
        })

        res.status(200).json({
            success: true,
            message: `Password Reset Email sent to ${user.email} successfully`
        })

    } catch (error) {
        user.resetPassWordToken = undefined
        user.resetPassWordTokenExpire = undefined
        await user.save({ validateBeforeSave: false })
        next(new ErrorHandler(error.message, 500))
    }

}


export const resetUserPassword = async (req, res, next) => {
    try {
        const resetPassWordToken = crypto.createHash('sha256').update('kuchhbhi').digest('hex')
        const user = await User.findOne({ resetPassWordToken, resetPassWordTokenExpire: { $gt: Date.now() } })
        if (!user) return next(new ErrorHandler('Reset password token is invalid or got expired', 404))
        if (req.body.password !== req.body.confirmPassword) return next(new ErrorHandler('password and confirm password did not matched', 400))
        user.password = req.body.password
        user.resetPassWordToken = undefined
        user.resetPassWordTokenExpire = undefined
        await user.save()
        const token = user.getJWTToken()
        sendResponse(res, token, user)
    } catch (error) {
        console.log('reset user password error', error)
        next(new ErrorHandler(error.message, 500))
    }
}

export const getUserDetail = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id)
        if(!user) return next(new ErrorHandler('User does not exist', 404))
        res.status(200).json({ success: true, user })
    } catch (error) {
        console.log('get user detail error', error)
        next(new ErrorHandler(error.message, 500))
    }
}

export const updateUserPassword = async (req, res, next) => {
   try {
       let user = await User.findById(req.user.id)
       const isPasswordMatch = await user.comparePassword(req.body.password)
       if (!isPasswordMatch) return next(new ErrorHandler('current password is incorrect', 400))
       if (req.body.newPassword !== req.body.confirmPassword) return next(new ErrorHandler('password and confirm password did not matched', 400))
       user.password = req.body.newPassword
       await user.save()
       const token = user.getJWTToken()
       sendResponse(res, token, user)
   } catch (error) {
       console.log('update user password error', error)
       next(new ErrorHandler(error.message, 500))
   }
}


export const updateUserProfile = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.user.id, req.body, { new: true, runValidators: true })
        res.status(200).json({ success: true, user })
    } catch (error) {
        console.log('update user profile error', error)
        next(new ErrorHandler(error.message, 500))
    }
}


//Admin Controllers
export const getAllUsersByAdmin = async (req, res, next) => {
   try {
       const users = await User.find()
       if(users.length === 0) return next(new ErrorHandler('There is no any users in the list'))
       res.status(200).json({ success: true, users })
   } catch (error) {
       console.log('get all user by admin error', error)
       next(new ErrorHandler(error.message, 500))
   }
}

export const getSingleUserDetailByAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) return next(new ErrorHandler('User does not exist with id: ' + req.params.id, 404))
        res.status(200).json({ success: true, user })
    } catch (error) {
       console.log('get single user detail by admin error', error)
       next(new ErrorHandler(error.message, 500))
    }
}

// updating user profile by admin
export const updateUserByAdmin = async (req, res, next) => {
    try {
        let user = await User.findById(req.params.id)
        if (!user) return next(new ErrorHandler(`User does not exist with id: ${req.params.id}`, 404))
        const updatedUser = Object.assign(user, { ...req.body })
        user = await User.findByIdAndUpdate(req.params.id, updatedUser, { new: true, runValidators: true })
        res.status(200).json({ success: true, user })
    } catch (error) {
        console.log('update user by admin', error)
        next(new ErrorHandler(error.message, 500))
    }
}

// deleting user profile by admin
export const deleteUserByAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) return next(new ErrorHandler(`user does not exist with id: ${req.params.id}`, 404))
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json({ success: true, message: `user deleted successfully` })
    } catch (error) {
        console.log('delete user by admin error', error)
        next(new ErrorHandler(error.message, 500))
    }
}