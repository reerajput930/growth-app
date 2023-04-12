const express = require('express')
const router = express.Router()
const themeModel = require('../model/themeModel')

router.get('/gettheme',async (req,res)=>{
    try {
       const theme = await themeModel.find({}) 
       res.status(200).json({"status":"success",theme:theme})   
    } catch (error) {
       console.log(error.message)
       res.status(404).json({"status":"failed"})   
    }
})


router.put('/updatetheme',async (req,res)=>{
    try {
    //    console.log(req.body.theme)
       const updatetheme = await themeModel.findByIdAndUpdate("64204a60c91625afa55114a4",{theme:req.body.theme}) 
    
    //    console.log(theme)
       res.status(200).json({"status":"success"})   
    } catch (error) {
       console.log(error.message)
       res.status(404).json({"status":"failed"})   
    }
})

module.exports = router

