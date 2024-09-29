const express = require('express');
const router = express.Router();

const {logIn} = require('../controller/login')
const {registration} = require('../controller/registration')

const {createProduct , getProducts , approveProduct , rejectProduct , adminProductView} = require('../controller/product');

const {auth,isAdmin} = require('../middleware/auth');

router.post('/login',logIn);
router.post('/registration',registration);

router.post('/create/product',auth,createProduct);
router.get('/get/products',getProducts);

router.put('/approve/product/:id',auth , isAdmin , approveProduct);
router.put('/reject/product/:id',auth , isAdmin , rejectProduct);
router.get('/admin/get/prducts',auth,isAdmin,adminProductView);

//Export Router
module.exports = router;
