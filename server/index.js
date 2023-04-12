const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose')
const cors = require('cors')
const missRouter = require("./routes/missRoutes")
const mrRouter = require("./routes/mrRoutes")
const themeRouter = require("./routes/themeRouter")
require('dotenv').config()


     
app.use(cors())  
app.use(express.json())
app.use('/api/miss',missRouter)  
app.use('/api/mr',mrRouter)  
app.use('/api/',themeRouter)  




mongoose.connect(`mongodb+srv://${process.env.dbusername}:${process.env.dbpassword}@nodeexpress-project.i1wimde.mongodb.net/toDoManager_riya_karan?retryWrites=true&w=majority`).then(()=>{
    app.listen(PORT,()=>{
        console.log(`listening on the port ${PORT}`)
    })
    
}).catch((error)=>{
      console.log(error)
})
