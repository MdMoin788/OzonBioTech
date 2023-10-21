
import mongoose from "mongoose";
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Enter Your Name'],
        maxLength: [30, 'Name cannot exceed 30 characters'],
        minLength: [3, 'Name should be alteast 3 characters'],
    },
    email: {
        type: String,
        required: [true, 'Please Enter Your Email'],
        unique: true,
        validate: [validator.isEmail, 'Please Enter a Valid Email']
    },
    password: {
        type: String,
        required: [true, 'Please Enter Your Password'],
        minLength: [8, 'password must be minimum 8 characters'],
     
    },
    avatar: {
        id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: 'user'
    },
    resetPassWordToken: {
        type: String,
    },
    resetPassWordTokenExpire: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
}, { versionKey: false })



// save password after hashing
userSchema.pre("save", async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 8)
})


// generating jwt token for authentication
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}

// matching password
userSchema.methods.comparePassword = async function (enteredPassword) {
    // console.log(enteredPassword)
    return await bcrypt.compare(enteredPassword, this.password)
}

// Generate password reset token
userSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString('hex')
    const hash = crypto.createHash('sha256', resetToken).update('kuchhbhi').digest('hex')
    this.resetPassWordToken = hash
    this.resetPassWordTokenExpire = Date.now() + 1000 * 60 * 10
    return resetToken
}

export const User = mongoose.model('User', userSchema, 'users')