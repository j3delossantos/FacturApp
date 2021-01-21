const { check, validationResult } = require("express-validator");
const userController = require("../controllers/user.controller");

//validate all field on the signUp Form
exports.signupValidation = [
  check("firstName")
    .not()
    .isEmpty()
    .withMessage("First name is required!")
    .trim()
    .escape()
    .isLength({ min: 3 })
    .withMessage("First name must be a least 3 characters!"),
  check("lastName")
    .trim()
    .escape()
    .isLength({ min: 3 })
    .withMessage("Last name must be a least 3 characters!"),
  check("password")
    .not()
    .isEmpty()
    .isLength({ min: 6 })
    .withMessage("Password must be a least 6 characters!"),
  check("confirmPassword")
    .not()
    .isEmpty()
    .custom(async (confirmPassword, { req }) => {
      const password = req.body.password;     
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }
    }),

  check("email", "Invalid email")
    .not()
    .isEmpty()
    .withMessage("Email is required!")
    .trim()
    .escape()
    .isEmail()
    .normalizeEmail()
    .custom((checkEmail) => {
      return new Promise((resolve, reject) => {
        userController.findUserByEmail(checkEmail).then((emailExist) => {
          if (emailExist !== null) {
            reject(
              new Error("Email already exist, please use a diferent email.")
            );
          } else {
            resolve(true);
          }
        });
      });
    }),
  (req, res, next) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    const errors = [];
    const validatioErrors = validationResult(req);
    if (!validatioErrors.isEmpty()) {
      validatioErrors.array().map((err) => errors.push({ text: err.msg }));

      return res.render("users/signup", {
        errors,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
      });
    } else next();
  },
];
