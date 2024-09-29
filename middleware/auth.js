const jwt = require('jsonwebtoken');

exports.auth = async(req,res,next) => {
    try{
        const token = req.cookies.token;

        if(!token){
            return res.status(400).json({
                success : false,
                message : 'Login First'
            })
        }

        try{
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            //Print
            console.log(decode);

            //Set this token into the req.user for future Uses
            req.user = decode;
        }
        catch(err){
            return res.status(500).json({
                success : false,
                message : 'Something Went Wrong while decoding the Token'
            })
        }

        next();
    }
    catch(err){
        return res.status(500).json({
            success : false,
            message : 'Something Went Wrong in Auth middleware'
        })
    }
};

exports.isAdmin = async(req,res,next) => {
    try{
        const {role} = req.user;

        if(role !== "Admin"){
            return res.status(400).json({
                success : false,
                message : "This is Protected Route..!!!"
            })
        }

        next();
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success : false,
            message : 'Something Went Wrong in Auth middleware'
        })
    }
};