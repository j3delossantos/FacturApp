const userController = {};
const db = require("../database/models");
const bcrypt = require("bcryptjs");

userController.renderSignUpForm = (req, res) => {
  res.render("users/signup");
};

//Get all users
userController.getUsers = async (req, res) => {
  result = await db.User.findAll({
    attributes:{exclude:['password']}
  });
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

//Find One user by Email to validate if is in use

userController.findUserByEmail = async (checkEmail) => {
  console.log("body: " + checkEmail);

  result = db.User.findOne({ where: { email: checkEmail } });

  return result;
};

//Inser a New User
userController.addUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // encrypt password before insert

  const saltRounds = 10;

  bcrypt.genSalt(saltRounds, async function (err, salt) {
    if (err) {
      console.log(err);
    } else {
      await bcrypt.hash(password, salt, async function (err, hash) {
        // Store hash in your password DB.
        if (err) {
          console.log(err);
        } else {
          //Inser usen into database

          await db.User.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hash,
            active: true,
          })//.then((submitetUser) => res.send(submitetUser));
          req.flash("success_msg", "You ar now registered, please proceed to login");
          res.redirect('/users/login');
        }
      });
    }
  });

  //}
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


//user login

userController.renderLoginForm = async (req, res) =>{
  res.render('users/login');

}

module.exports = userController;
