const express = require('express');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();
require('dotenv').config();


const JWT_SECRET = process.env.JWT_SECRET;



//ROUTE 1: Create a User using : POST "api/auth/createuser". No login required

router.post('/createuser' , [
    body('name' , "Enter a valid name").isLength({ min: 3 }),
    body('email' , "Enter a valid email").isEmail(),
    body('password', "password must have atleast 5 characters").isLength({ min: 5 })

    ] , async (req , res)=>{

        // If there are errors return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({success :false , errors: errors.array() });
        }
        try{

        
           // Check if the user already exists
            let user = await User.findOne({email : req.body.email});
            if(user){
                return res.status(400).json({success: false, error : "User with this email already exists"});
            }
            const salt =  await bcrypt.genSalt(10);
            const hashedPassword =await  bcrypt.hash( req.body.password , salt)

            user = await User.create({
               name: req.body.name,
               email: req.body.email,
               password: hashedPassword
             })
             const data ={
              user : {

                id : user.id
              }

             }
             const authToken = jwt.sign(data , JWT_SECRET  )
             const username = user.name;
             res.json({success: true,authToken ,username})
            }
        catch(err){ 
            console.log(err.message + "createuser error")
            res.status(500).json({success: false , message: err.message} )}
          
})

//ROUTE 2: User login using : POST "api/auth/login". No login required

router.post('/login' , [
  body('email' , "Enter a valid email").isEmail(),
  body('password' , "Password is required").exists(),

  ] , async (req , res)=>{
     // If there are errors return bad request and the errors
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
       return res.status(400).json({success :false , errors: errors.array() });
     }

     const {email , password}= req.body;
     try{
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({success: false, error : "Please try to login with correct credentials"});
        }
        const passwordCompare = await  bcrypt.compare(password , user.password)
        if(!passwordCompare){
          return res.status(400).json({success: false, error : "Please try to login with correct credentials"});  
        }
        const data ={
          user : {

            id : user.id
          }

         }
         const authToken = jwt.sign(data , JWT_SECRET  )
         const username = user.name;
         res.json({success: true,authToken ,username}) 

          

     }
     catch(err){
      console.log(err.message +"login error")
      res.status(500).json({success: false , message: "Internal Server Error!"} )
     }
  })

  //ROUTE 3: Get loggedin User Details using: POST "api/auth/getuser". Login required

router.post( '/getuser', fetchuser, async (req , res)=>{
    try {
      let userId= req.user.id;
      const user = await User.findById(userId).select("-password")
      res.send(user);
    } catch (err) {
      console.log(err.message +"getuser error")
      res.status(500).json({success: false , message: "Internal Server Error! "})
    }
  }
)
  //ROUTE 4: Delete existing User using: DELETE "api/auth/deleteuser". Login required

  router.delete( '/deleteuser', fetchuser, async (req , res)=>{
    try {
      let userId= req.user.id;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
      await User.findByIdAndDelete(userId);
      res.send({success:true , message :"User deleted successfully" });
    } catch (err) {
      console.error(err.message)
      res.status(500).json({success: false , message: "Internal Server Error!"})
    }
  }
  )

module.exports = router