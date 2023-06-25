import jwt from 'jsonwebtoken';

export default (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token){
        return res.json('No token...');
    }
    return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err){
            return res.json('invalid token loser!');
        }
        else{
            req.user = decoded;
            return next();
        }
    });
};