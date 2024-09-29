const Product = require('../models/productModel');
const User = require('../models/userModel');

exports.createProduct = async (req,res) => {
    try{
        const {name , description , price , quantity} = req.body;
        const {id} = req.user;

        if(!id){
            return res.status(400).json({
                success : false,
                message : "Login First..!!!"
            })
        }

        if(!name || !description || !price || !quantity){
            return res.status(400).json({
                success : false,
                message : "Enter the data Carefully"
            })
        }

        const newProduct = await Product.create({userId : id,name,description,price,quantity});
        const updateUser = await User.findByIdAndUpdate(id , {$push : {products : newProduct._id}});

        return res.status(200).json({
            success : true,
            message : "Product added Successfully",
            action : "Admin will check and approved this if it satisfy all the criteria"
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success : false,
            message : 'Something went wrong while Creating Product'
        })
    }
};

exports.getProducts = async(req,res) => {
    try{
        const allProducts = await Product.find({});

        const approvedProducts = allProducts.filter((product) => product.status === "Approved")

        if(approvedProducts.length === 0){
            return res.status(200).json({
                success : true,
                message : "There is no Approved Products"
            })
        }

        return res.status(200).json({
            success : true,
            products : approvedProducts
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success : false,
            message : 'Something went wrong while Fetching all Products'
        })
    }
};

exports.approveProduct = async(req,res) => {
    try{
        const {id} = req.params;

        const product = await Product.findById(id);

        if(!product){
            return res.status(400).json({
                success : false,
                message : "Product is Not Found"
            })
        }

        if(product.status === "Approved"){
            return res.status(400).json({
                success : false,
                message : "Product was Approved Already"
            })
        }
        
        if(product.status === "Rejected"){
            return res.status(400).json({
                success : false,
                message : "Product was Rejected Already"
            })
        }

        await product.updateOne({status : "Approved"})

        // await Product.findByIdAndUpdate(id,{status : "Approved"});

        return res.status(200).json({
            success : true,
            message : "Product Successfully Approved"
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success : false,
            message : 'Something went wrong while Approving Product'
        })
    }
};

exports.rejectProduct = async(req,res) => {
    try{
        const {id} = req.params;

        const product = await Product.findById(id);

        if(!product){
            return res.status(400).json({
                success : false,
                message : "Product is Not Found"
            })
        }

        if(product.status === "Approved"){
            return res.status(400).json({
                success : false,
                message : "Product was Approved Already"
            })
        }
        
        if(product.status === "Rejected"){
            return res.status(400).json({
                success : false,
                message : "Product was Rejected Already"
            })
        }

        await product.updateOne({status : "Rejected"})

        // await Product.findByIdAndUpdate(id,{status : "Approved"});

        return res.status(200).json({
            success : true,
            message : "Product Successfully Rejected"
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success : false,
            message : 'Something went wrong while Rejecting Product'
        })
    }
};

exports.adminProductView = async(req,res) => {
    try{
        const allProducts = await Product.find({});

        res.status(200).json({
            success : true,
            products : allProducts
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success : false,
            message : 'Something went wrong while Fetching all Products'
        })
    }
};