const { validationResult } = require("express-validator");

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error("Invalid email or password!");
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
      }
}