import bcrpytjs from 'bcryptjs';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import createError from '../utils/createError.js';

export const register = async(req, res, next) => {
    if(!req.body.name || !req.body.email || !req.body.password){
        return next(createError({status: 400, message: 'Name/email/password required!'}));
    } 
    // make individual ifs!

    try{
        const salter = await bcrpytjs.genSalt(10);
        const hashedPass = await bcrpytjs.hash(req.body.password, salter);

        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPass

        });
        await newUser.save();
        return res.status(201).json('New user created!');
    }catch(err){
        console.log(err);
        return next(err);
    }
};

export const login = async(req, res, next) =>{
    if(!req.body.email || !req.body.password){
        return next(createError({status: 400, message: 'Name email required!'}));
    }
    try{
        const user = await User.findOne({email: req.body.email}).select(
            'name email password',
        );
        if(!user){
            return next(createError({status:404, message: 'No user found!'}));
        }
        const correctPass = await bcrpytjs.compare(req.body.password, user.password);
        if (!correctPass){
            return next(createError({status:400, message: 'Password incorrect'}));
        }
        const payload = {
            id: user._id,
            name: user.name,
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET,{
            expiresIn: '1d',
        });
        return res.cookie('access_token', token,{
            httpOnly: true,
        }).status(200)
        .json({message: "Login Success"});
    }catch(err){
        console.log(err);
        return next(err);
    }
};

export const logout = (req, res)=>{
    res.clearCookie('access_token');
    return res.status(200).json({message: 'Logout Message!'});
};

export const isLoggedIn = async (req, res) => {
    const token = req.cookies.access_token;
    if (!token) {
      return res.json(false);
    }
    return jwt.verify(token, process.env.JWT_SECRET, (err) => {
      if (err) {
        return res.json(false);
      }
      return res.json(true);
    });
};