const errorMiddleware = require("./error");
const accessMiddleware = require("./access");
const authMiddleware = require("./auth");

module.exports = { errorMiddleware, accessMiddleware, authMiddleware };
