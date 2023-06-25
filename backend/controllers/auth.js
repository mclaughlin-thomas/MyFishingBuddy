import bcrpytjs from 'bcryptjs';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

export const register = async(req, res) => {
    if(!req.body.name || !req.body.email || !req.body.password){
        return res.json('required field email, name, or password');
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
        return res.json('Server error');
    }
};

export const login = async(req, res) =>{
    if(!req.body.email || !req.body.password){
        return res.json('required fields: name, password');
    }
    try{
        const user = await User.findOne({email: req.body.email}).select(
            'name email password',
        );
        if(!user){
            return res.status(404).json('No user found');
        }
        const correctPass = await bcrpytjs.compare(req.body.password, user.password);
        if (!correctPass){
            return res.json('password is incorrect');
        }
        const payload = {
            id: user._id,
            name: user.name
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET,{
            expiresIn: '1d'
        })
        return res.cookie('access_token', token,{
            httpOnly: true,
        }).status(200)
        .json({message: "Login Success"});
    }catch(err){
        console.log(err);
        return res.json('server error');
    }
};