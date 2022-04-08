const bcrypt = require("bcrypt");
const User = require("../schema/user");
const jwt = require("jsonwebtoken");
const { collection } = require("../schema/user");
// const { post } = require("../route/route");
// const { use } = require("passport/lib");

module.exports.getDocument = async function (req, res) {
    try {
        const user =  await User.find({email: req.body.email});
        if (user){       
            return res.status(200).send(user);
}     
    } catch (error) {
        res.status(400).send("No documents found..")
    }
}

module.exports.register = async function (req, res) {
    try{

        //hash password
        const salt = await bcrypt.genSalt(10);
        const HashedPassword = await bcrypt.hash(req.body.password, salt);

        //creating new user
        const userData = new User({
            firstName: req.body.firstName,
            email: req.body.email,
            lastName: req.body.lastName,
            // role: req.body.role,
            password: HashedPassword
        })  

         //find user
        const oldUser = await User.findOne({email: req.body.email})
        if(oldUser) { res.status(400).send("User already Existed.")
    }
        else{
            await userData.save();
            res.status(201).send("User created Successfully.");
        }
    }
    catch (error) {
        console.log(error); 
    }
}
module.exports.adminRegister = async function (req, res) {
    try{

        //hash password
        const salt = await bcrypt.genSalt(10);
        const HashedPassword = await bcrypt.hash(req.body.password, salt);

        //creating new user
        const userData = new User({
            firstName: req.body.firstName,
            email: req.body.email,
            lastName: req.body.lastName,
            role: "admin",
            password: HashedPassword
        })  

         //find user
        const oldUser = await User.findOne({email: req.body.email})
        if(oldUser) { res.status(400).json({message: "Admin already Existed."})
    }
        else{
            await userData.save();
            res.status(201).send("Admin created Successfully.");
        }
    }
    catch (error) {
        console.log(error); 
    }
}
module.exports.superAdminRegister = async function (req, res) {
    try{

        //hash password
        const salt = await bcrypt.genSalt(10);
        const HashedPassword = await bcrypt.hash(req.body.password, salt);

        //creating new user
        const userData = new User({
            firstName: req.body.firstName,
            email: req.body.email,
            lastName: req.body.lastName,
            role: "super-admin",
            password: HashedPassword
        })  

         //find user
        const oldUser = await User.findOne({email: req.body.email})
        if(oldUser) { res.status(400).send("User already Existed.")
    }
        else{
            await userData.save();
            res.status(201).send("User created Successfully.");
        }
    }
    catch (error) {
        console.log(error); 
    }
}

module.exports.login = async function(req,res){
    try {
        const userData = new User({
            email: req.body.email,
            password: req.body.password
        })  

        const user = await User.findOne({email: req.body.email}) 
        if(user){
            const validateUser = await bcrypt.compare(req.body.password, user.password)
            if(validateUser){
                //create and asign token
                const Token = jwt.sign({
                    email:user.email,
                    firstName:user.firstName,
                    lastName:user.lastName,
                    role:user.role},
                    process.env.TOKEN_SECRET);
                res.send(Token)                
            
            };
            return {status: res.status(403),
                message:  "Invalid.. "}
        }
        
        return res.status(403)
        console.log("User doesn't existed.")

    } catch (error) {
        res.status(403).send(error)
    }
}
module.exports.adminLogin = async function(req,res){
    try {
        const userData = new User({
            email: req.body.email,
            password: req.body.password
        })  

        const user = await User.findOne({email: req.body.email}) 
        if(user && user.role === "admin"){
            const validateUser = await bcrypt.compare(req.body.password, user.password)
            if(validateUser){
                //create and asign token
                const Token = jwt.sign({
                    email:user.email,
                    firstName:user.firstName,
                    lastName:user.lastName,
                    role:user.role},
                    process.env.TOKEN_SECRET);
                res.send(Token)                
            
            };
            return {status: res.status(403),
                message:  "Invalid.. "}
        }
        
        return res.status(403)
        console.log("User doesn't existed.")

    } catch (error) {
        res.status(403).send(error)
    }
}
module.exports.superAdminLogin = async function(req,res){
    try {
        const userData = new User({
            email: req.body.email,
            password: req.body.password
        })  

        const user = await User.findOne({email: req.body.email}) 
        if(user && user.role === "super-admin"){
            const validateUser = await bcrypt.compare(req.body.password, user.password)
            if(validateUser){
                //create and asign token
                const Token = jwt.sign({
                    email:user.email,
                    firstName:user.firstName,
                    lastName:user.lastName,
                    role:user.role},
                    process.env.TOKEN_SECRET);
                res.send(Token)                
            
            };
            return {status: res.status(403),
                message:  "Invalid.. "}
        }
        
        return res.status(403)
        console.log("User doesn't existed.")

    } catch (error) {
        res.status(403).send(error)
    }
}

module.exports.updateProfile = async function(req, res){
    try {
        const salt = await bcrypt.genSalt(10);
        const HashedPassword = await bcrypt.hash(req.body.password, salt);

        const user =  await User.findOne({email: req.body.email})
        if (user){       
            await User.findByIdAndUpdate(user.id, {password: HashedPassword}, (err, data) =>{
            if(err) {
                console.log(err)
            }
            return res.send(data);
            console.log("Data updated successfully.");
        });
        };
        return console.log(error)
    }catch (error) {
        console.log("Can't update user.")
    }
}
module.exports.deleteProfile = async function(req, res){
    //who as the authority to delete an account?
    try {

        const user =  await User.findOne({email: req.body.email});
        if (user){       
            await User.findOneAndDelete({email: req.body.email});
            return res.status(200).send("data deleted successfully.");
}       return res.status(400).send("user doesn't exist.") ;
    }   
    catch (error) {
        console.log(error);
    };
};

module.exports.getAllUser = async function (req, res){
    try {
        const allUser = await User.find();
        const filterUser = allUser.filter(users =>
            users.role === "user"
        )
        res.status(200).json(filterUser);
    } catch (error) {
        res.status(401).json(error);
    };
};

