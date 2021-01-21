var express = require('express');
const userController = require('../controllers/user.controller');
const { signupValidation } = require('../validations/signup.validation');
var router = express.Router();


//Render signUp form
router.get('/users/signup', userController.renderSignUpForm);

/* GET users listing. */
router.get('/users', userController.getUsers);

//Get one use by ID
router.get('/users/find/:id', userController.getOneUser);


//Insert one user
router.post('/users/add', signupValidation, userController.addUser);

//Delete a user
router.delete('/users/delete/:id', userController.deleteUser);

//update user
router.put('/users/update/:id', userController.UpdateUser); 


module.exports = router;
 