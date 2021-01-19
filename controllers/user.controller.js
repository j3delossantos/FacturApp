const userController = {};
const db = require("../database/models");
const { Op } = require("sequelize");



userController.renderSignUpForm = (req, res) => {
  res.render("users/signup");
};

//Get all users
userController.getUsers = async (req, res) => {
  result = await db.User.findAll();
  if (result) {
    res.send(result);
  } else {
    res.send("not found");
  }
};

//Find One user by ID
userController.getOneUser = async (req, res) => {
  result = await db.User.findByPk(req.params.id);
  if (result) {
    res.send(result);
  } else {
    res.send("not found");
  }
};

//Inser a New User
userController.addUser = async (req, res) => {
  const errors = [];
  const { name, email, password, confirmPassword } = req.body;

  //Validate if passwor match
  if (password != confirmPassword) {
    errors.push({ text: "PAssword do not match" });
  }
  //Validate pasword minimum length
  if (password.length < 6) {
    errors.push({ text: "Password must be a least 6 characters." });
  }
  //Validate if there are error untill this point
  if (errors.length > 0) {
    res.render("users/signUp", {
      errors,
      name,
      email,
      password,
      confirmPassword,
    });
  } else {
    //Check if email exist
    emaiCheck = await db.User.findAll({
      where: {
       email:{ 
           [Op.substring]: email
        }
      },
    });
    console.log("emailChech"+emaiCheck);
    
      //Inser usen into database

      db.User.create({
        firstName: name,
        lastName: name,
        email: email,
        password: password,
        active: true,
      }).then((submitetUser) => res.send(submitetUser));
    
  }
};

//Update a User
userController.UpdateUser = async (req, res) => {
  userId = req.params.id;
  updatedUser = req.body;
  if (userId) {
    db.User.update(
      {
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        password: updatedUser.password,
      },
      {
        where: {
          id: userId,
        },
      }
    );
    res.send("User Updated ");
  }
};

//Delet a user

userController.deleteUser = async (req, res) => {
  userId = req.params.id;
  if (userId) {
    db.User.destroy({
      where: {
        id: userId,
      },
    });
    res.send("User Deleted");
  }
};

module.exports = userController;
