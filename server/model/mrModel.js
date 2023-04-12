const mongoose = require('mongoose')


// for current todo
const currentToDoSchema = mongoose.Schema({
    todo:{
        type: 'String',
        require:true

    },
    mark:{
        type: 'Boolean',
         default: false
    }
})

// for progress
const progressSchema = mongoose.Schema({
    taskDesc:{
        type:"String",
        require:true
    },
    tags: {
        type: [String],
    },
    category: {
        type: String,
        default: "todo",
      },
})

const inputModel = mongoose.model("MrTask",currentToDoSchema)
const progressModel = mongoose.model("MrProgress",progressSchema)

module.exports = {inputModel,progressModel}
