import User from '../models/User.js'

export const getUserInfo = async(req, res, next) =>{
    try{
        const data = await User.findById(req.user.id).select('name email');
        return res.status(200).json(data);
    }catch(err){
        return next(err);
    }
}

export const updateUser = async (req, res, next)=>{
    try{
        const updatedUser = await User.findByIdAndUpdate(req.user.id, {
            name: req.body.name,
            email: req.body.email
        },{
            new: true
        }).select('name email');
        return res.status(200).json(updatedUser);
    }catch(err){
        return next(err);
    }
}