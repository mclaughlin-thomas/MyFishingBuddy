import Fish from '../models/Fish.js'
import createError from '../utils/createError.js'

export const createTask = async (req, res, next) => {
    try{
        const newTask = new Fish({
            title: req.body.title,
            user: req.user.id,
            completed: req.body.completed,
        });
        const savedTask = await newTask.save();
        return res.status(201).json(savedTask);
    }catch(err){
        return next(err);
    }
};

export const getAllFish = async (req,res,next) => {
    try{
        const tasks = await Fish.find({});
        return res.status(200).json(tasks);
    }catch(err){
        return next(err);
    }
};

export const getCurrentUsersFish = async (req,res,next) => {
    try{
        const tasks = await Fish.find({user: req.user.id});
        return res.status(200).json(tasks);
    }catch(err){
        return next(err);
    }
};

export const updateFish = async (req,res,next)=> {
    try{
        const task = await Fish.findById(req.params.fishId).exec();
        if(!task){
            return next(createError({status: 404, message: "No Fish were found!"}));
        }
        if(task.user.toString() !==req.user.id){
            return next(createError({status: 404, message: "That not your Fishy!"}));
        }
        const updatedFish = await Fish.findByIdAndUpdate(req.params.fishId, {
            title: req.body.title,
            completed: req.body.completed
        }, {new: true});
        
        return res.status(200).json(updatedFish);
    }catch(err){
        return next(err);
    }
}

export const deleteFish = async (req,res,next)=>{
    try{
        const task = await Fish.findById(req.params.fishId).exec();
        if(!task){
            return next(createError({status: 404, message: "No Fish were found!"}));
        }
        if(task.user.toString() !==req.user.id){
            return next(createError({status: 404, message: "That not your Fishy!"}));
        }

        await Fish.findByIdAndDelete(req.params.fishId);
        return res.status(200).json('Task deleted successfully!');
    }catch(err){
        return next(err);
    }
}