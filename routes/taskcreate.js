const express = require('express')
const auth = require('../middleware/user_jwt')
const task = require('../models/TaskCreate')
const router = express.Router();

router.post('/', auth, async(req,res,next)=>{
    try {
        const taskAdd = await task.create({
            category: req.body.category,
            postTask:req.body.postTask,
            location: req.body.location,
            workType : req.body.workType,
            basePrice: req.body.basePrice,
            user: req.body.id,
            email: req.body.email,
            name:req.body.name
        });
        if(!taskAdd){
            return res.status(400).json({
                success:false,
                msg:"Something went wrong"
            });
        }

        res.status(200).json({
            success:true,
            taskCreate: taskAdd,
            msg:"Successfully Created"
        });
    } catch (error) {
        next(error);
    }
});

//task to all user
router.get('/',auth,async(req,res,next)=>{
    try {
        const tasks = await task.find();
        if(!tasks){
            return res.status(400).json({
                success: false,
                msg:'Something went wrong'
            })
        }

        res.status(200).json({
            success:true,
            count: tasks.length,
            tasks: tasks,
            msg: 'Successfully fetched'
        })
    } catch (error) {
        next(error);
    }
});


//by id
router.get('/:id',auth,async(req,res,next)=>{
    try {
        let taskFetch = await task.findById(req.params.id);
        if(!taskFetch){
            return res.status(400).json({
                success: false,
                msg : 'Not found any task'
            });
        }

        taskFetch = await task.findByIdAndUpdate(req.params.id, req.body,{
            new : true,
            runValidators: true
        });

        res.status(200).json({success: true,task: taskFetch,msg:'Successfully Updated'})     
    } catch (error) {
        next(error)
    }
})


//update task
router.put('/:id',async(req,res,next)=>{
    try {
        let taskUpdate = await task.findById(req.params.id);
        if(!taskUpdate){
            return res.status(400).json({
                success: false,
                msg : 'Not found any task'
            });
        }

        taskUpdate = await task.findByIdAndUpdate(req.params.id, req.body,{
            new : true,
            runValidators: true
        });


        res.status(200).json({success: true,task: taskUpdate,msg:'Successfully Updated'})

    } catch (error) {
        next(error)
    }
});


//delete task
router.delete('/:id',async(req,res,next)=>{
    try {
        let taskDelete = await task.findById(req.params.id);
        if(!taskDelete){
            return res.status(400).json({success:false,msg:'Task not exists'});
        }

        taskDelete = await task.findByIdAndDelete(req.params.id);

        res.status(200).json({success: true, msg:'Successfully deleted'})
    } catch (error) {
        next(error)
    }
});


//fetch task


module.exports = router;