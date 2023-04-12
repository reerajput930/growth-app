const mongoose = require('mongoose')


const themeSchema = mongoose.Schema({
    theme:"String"
})

const themeModel = mongoose.model("Theme",themeSchema)

module.exports = themeModel
