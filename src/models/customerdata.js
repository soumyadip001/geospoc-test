const mongoose = require('mongoose')
const validator = require('validator')

const formSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is invalid")
            }
        }
    },
    cover: {
        type: String,
        trim: true
    },
    webAddress: {
        type: String,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isURL(value)) {
                throw new Error("URL is invalid")
            }
        }
    },
    attachment: {
        type: String
    },
    ip: {
        type: String,
        required: false,
        trim: true,
        validate(value) {
            if (!validator.isIP(value)) {
                throw new Error("IP Address is invalid")
            }
        }
    }
}, {
    timestamps: true
})

const Post = mongoose.model('CustomerData', formSchema)

module.exports = Post