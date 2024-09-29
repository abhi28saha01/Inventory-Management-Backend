const User = require('../models/userModel');
const bcrypt = require('bcrypt');

exports.registration = async (req,res) => {
    try{
        //Fetch the Required Information
        const {username,name,email,password,confirmPassword , accountType} = req.body;

        //Validation
        if(!username || !email || !password || !confirmPassword || !name){
            return res.status(400).json({
                success : false,
                message : 'Enter the Details for Registration Carefully'
            })
        }

        //Check user Already Present in the Databse Or Not
        if(await User.findOne({username}) || await User.findOne({email})){
            return res.status(400).json({
                success : false,
                message : 'User Already Registered'
            })
        }

        //Check Password with Confirm Password
        if(password !== confirmPassword){
            return res.status(400).json({
                success : false,
                message : 'Password and Confirm Password are not Same'
            })
        }

        let hashPass;
        try{
            //Hasing the Password Using Bcrypt
            hashPass = await bcrypt.hash(password,10);
        }
        catch(err){
            console.log(err);
            return res.status(500).json({
                success : false,
                message : 'Internal Server Problem while Hashing Password'
            })
        }
        
        //Creating New User
        const newUser = await User.create({username,name,email,accountType : accountType ,password : hashPass ,accountType});

        //Return Successful Message
        res.status(200).json({
            success : true,
            data : newUser,
            message : 'User Registered Successfully'
        })

    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success : false,
            message : 'Something went wrong while User Register'
        })
    }
}