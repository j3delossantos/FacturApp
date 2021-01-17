const userController ={}
const db = require('../database/models');
const user = require('../database/models/user');


//Get all users
userController.getUsers = async (req, res)=>{
    result = await db.User.findAll();
    if (result) {
        res.send(result);
        
    }else{
        res.send("not found")
    }
 
}

//Find One user by ID
userController.getOneUser = async(req,res)=>{
   result = await db.User.findByPk(req.params.id);
   if (result) {
       res.send(result);
       
   }else{
       res.send("not found")
   }
}


//Inser a New User
userController.addUser= async (req,res)=>{
    
    newUser = req.body;
    //res.send(newUser);
    db.User.create({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        password:newUser.password
    }).then(submitetUser=> res.send(submitetUser));

}

//Update a User
userController.UpdateUser = async (req,res)=>{
    userId = req.params.id;
    updatedUser= req.body;
    if (userId) {
        db.User.update(
            {
                firstName: updatedUser.firstName,
                lastName: updatedUser.lastName,
                email: updatedUser.email,
                password:updatedUser.password

            },
            {
                where:{
                    id:userId
                }

            });
            res.send("User Updated ");
    }
}


//Delet a user

userController.deleteUser = async (req,res)=>{
    userId = req.params.id;
    if (userId) {
        db.User.destroy({
            where:{
                id:userId
            }
        })
        res.send("User Deleted")
    }
}


 

module.exports = userController;
