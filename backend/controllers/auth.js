import bcrpytjs from 'bcryptjs';
import User from '../models/User.js';

export const register = async(req, res) =>{
    if(!req.body.name || !req.body.email || !req.body.password){
        return res.json('required field email, name, or password');
    } // make individual ifs!

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

export const login = () =>{

};