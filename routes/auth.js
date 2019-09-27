const router = require('express').Router()
const Teacher = require('../model/teachers.model')
//const bodyParse = require('body-parser')
const {registerValidation} = require('../routes/validation')
const bcrypt = require('bcrypt')
const {loginValidation} = require('../routes/validation')
const jwt = require('jsonwebtoken')

//Get all the user
router.get('/',async(req,res)=>{
    try{
        const teachers = await Teacher.find()
        res.json(teachers)
    }catch(err){
        res.json({message:err})
    }
})



//REGISTER
router.post('/register', async (req,res)=>{
    //validate data
    const {error} = registerValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    //to check if the teacher already in the database
    const emailExist = await Teacher.findOne({
        email: req.body.email
    })
    if(emailExist) return res.status(400).send("Email already exists")

    //hashing password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password,salt)

    //create new teacher
    const teacher = new Teacher({
        fullname: req.body.fullname,
        email: req.body.email,
        password: hashPassword,
        mobile: req.body.mobile
    })
    try{
        const savedTeacher = await teacher.save()
        res.send({teacher:teacher._id})
    }catch(err){
        res.status(400).send(err)
    }
})



//LOGIN
router.post('/login',async (req,res)=>{
   
    //validate data
    const {error} = loginValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    
    
    //to check if the email exist
    const teacher = await Teacher.findOne({
        email: req.body.email
    })
    if(!teacher) return res.status(400).send("Email or password is wrong")

    //Check if password is correct
    const validPass = await bcrypt.compare(req.body.password,teacher.password)
    if(!validPass) return res.status(400).send("Email or password is wrong")

    // //Create and assign a token
    // const token = jwt.sign({_id: teacher._id}, process.env.TOKEN_SECRET)

    // res.header('auth-token',token).send(token)
    res.send('Logged in!')

})


//Update data
router.patch('/reset/:teacher',async(req,res)=>{
 
    try{
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(req.body.password,salt)
        const updateTeacher = await Teacher.updateOne(
           {_id:req.params.teacher},
           {password: hashPassword}
           )
           res.json(updateTeacher)

    }catch(err){
        res.send('ERROR')
    }

})


//Delete 
router.delete('/delete/:teacher',async(req,res)=>{
    try{
        const removeTeacher = await Teacher.remove(
            {_id:req.params.teacher}
        )
        res.json(removeTeacher)
    }catch(err){
        res.send('ERROR')
    }
})

module.exports = router
