const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    cart: [
        {
            food_id: {
                type: String,
                ref: 'Food'
            }
            // qty: {
            //     type: Number
            // },
            // purchased: {
            //     type: Boolean
            // }
        }
    ],
    order: [
        {
            food_id: {
                type: String,
                ref: "Food"
            },
            food_title: {
                type: String,
                required: true
            }
        }
    ]
})
UserSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({ email })
    if (!user) {
        throw Error('Invalid email')
    }
    const isMatchPW = await bcrypt.compare(password, user.password)

    if (!isMatchPW) {
        throw Error('Invalid password')
    }

    return user
}

UserSchema.statics.signup = async function (email, password) {
    const emailExist = await this.findOne({ email })

    if (!email || !password) {
        throw Error('All fields must be filled')
    }
    if (!validator.isEmail(email)) {
        throw Error('Email not valid')
    }
    // if (!validator.isStrongPassword(password)) {
    //     throw Error('Password not strong enough')
    // }

    if (emailExist) {
        throw Error('Email already in use')

    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const user = await this.create({ email: email, password: hash })

    return user
}

module.exports = mongoose.model('User', UserSchema)