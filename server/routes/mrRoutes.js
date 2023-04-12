const express = require("express");
const router = express.Router();
const { inputModel, progressModel } = require("../model/mrModel");

// current todo crud operation ------------------------------------
router.get("/alltodo", async (req, res) => {
  try {
    const tasks = await inputModel.find({});
    // console.log(tasks);
    res.status(200).json({ status: "success", tasks: tasks });
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ status: "failed" });
  }
});

router.post("/addtodo", async (req, res) => {
  const { todo, mark } = req.body;
  try {
    const task = await inputModel.create({ todo, mark });
    console.log(task);
    res.status(200).json({ status: "success" });
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ status: "failed" });
  }
});

router.delete("/removetodo", async (req, res) => {
  try {
    const task = await inputModel.findByIdAndDelete(req.body._id);
    console.log(task);
    res.status(200).json({ status: "success" });
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ status: "failed" });
  }
});

router.put("/updatetodo", async (req, res) => {
  try {
    const task = await inputModel.findByIdAndUpdate(req.body._id, {
      mark: !req.body.mark,
    });
    res.status(200).json({ status: "success" });
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ status: "failed" });
  }
});

//  for progress crud operation ---------------------------------

// fetching the data
router.get("/progress/alltask", async (req, res) => {
  try {
    const tasks = await progressModel.find({});
    // console.log(tasks);
    res.status(200).json({ status: "success", tasks: tasks });
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ status: "failed" });
  }
});

// deleting the data
router.delete("/progress/remove", async (req, res) => {
  try {
    const task = await progressModel.findByIdAndDelete(req.body._id);
    console.log(task)
    res.status(200).json({ status: "success" });
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ status: "failed" });
  }
});

// for adding data
router.post("/progress/addtask", async (req, res) => {

  try {
    const task = await progressModel.create({
      taskDesc:req.body.taskDesc, 
      tags:req.body.tags
    });
    console.log(task)
    res.status(200).json({ status: "success" });
  } catch (error) {

    console.log(error.message);
    res.status(404).json({ status: "failed" });
  }
});

// for updating
router.put("/progress/updatetask", async(req,res)=>{
  try {
      const   user = await progressModel.findByIdAndUpdate(req.body._id,{category: req.body.category})  
      res.status(200).json({status:"success"})
      
  } catch (error) {
      console.log("problem in update")
      console.log(error.message)
      res.status(404).json({status:"failed"})
  }
})

module.exports = router;
