const mongoose = require('mongoose')
const {marked} = require('marked')
const slugify = require('slugify')
const createDOMPurify = require('dompurify')
const { JSDOM } = require('jsdom')
const dompurify = createDOMPurify(new JSDOM().window)
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String, 
            required: true
        }
    },
    {
        versionKey: false
    }
)

//ENCRIPTAR CONTRASEÑA
userSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

//VALIDAR CONTRASEÑA 
userSchema.methods.comparePassword= function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema)