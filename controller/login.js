const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

exports.logIn = async(req,res) => {
    try{
        //Fetch the Required Information
        const {email , password} = req.body;

        //Validation Check
        if(!email || !password){
            return res.status(400).json({
                success : false,
                message : 'Enter the Details Carefully'
            })
        }

        //Check For User
        const user = await User.findOne({email : email});
        //If User Not Find
        if(!user){  
            return res.status(400).json({
                success : false,
                message : 'User is Not Present'
            })
        }

        //If user is Present in DB
        //Now check whether the Password is matching or not
        //If Matched
        if(await bcrypt.compare(password,user.password)){
            const payload = {
                email : user.email,
                id : user._id,
                role : user.accountType
            }
            //create Token
            const token = jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn : '2h'
            })
            user.token = token;
            user.password = undefined;

            const options = {
                expires : new Date(Date.now() + 2 * 60 * 60 * 1000),
                httpOnly : true
            }
            //Create Cookie and attach Token into the Cookie
            return res.cookie('token',token,options).status(200).json({
                success : true,
                user,
                message : 'You are Successfully Logged In'
            })
        }else{
            //If Password not matched
            res.status(400).json({
                success : false,
                message : 'Icorrect Password'
            })
        }
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success : false,
            message : 'Something went wrong while User Logging'
        })
    }
};