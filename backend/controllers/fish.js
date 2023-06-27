import Fish from '../models/Fish.js'

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

export const getAllTasks = async (req,res,next) => {
    try{
        const tasks = await Fish.find({});
        return res.status(200).json(tasks);
    }catch(err){
        return next(err);
    }
};
