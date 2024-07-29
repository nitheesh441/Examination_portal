const mongoose = require('mongoose')

const dbUri = 'mongodb+srv://nitheeshk441:nitheesh@examportal.tiwmgfy.mongodb.net/xamportal?retryWrites=true&w=majority&appName=Examportal'



mongoose.set('strictQuery', false)

module.exports = () => {
    return mongoose.connect(dbUri)
}