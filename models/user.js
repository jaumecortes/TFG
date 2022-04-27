//Modelos de las bases de datos
const mongoose = require('mongoose')
const {Schema} = mongoose
const bcrypt = require('bcryptjs') //npm install bcryptjs

//creamos el modelo de la base de datos
const users = new Schema({
    nombre: String,
    email: String,
    password: String,
    passwordconfirm: String
})

users.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    const contraseñaCifrada = bcrypt.hash(password, salt)
    return contraseñaCifrada
}

users.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}




//exportamos la base de datos
module.exports = mongoose.model('users', users)