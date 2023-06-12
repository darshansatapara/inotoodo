const express= require('express');
const router = express.Router();
const User = require('../models/note')




router.get('/',(req,res)=>
{
    console.log(req.body)
})

module.exports=router;
