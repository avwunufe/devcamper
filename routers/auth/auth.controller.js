const { registerUser, loginUser, findUser } = require("../../models/users/User.model")
const ErrorResponse = require('../../utils/errorResponse');
const asyncHandler = require("../../middleware/async")

exports.httpsRegisterUser = asyncHandler(async function(req, res, next) {
    const { name, email, password, role } = req.body

    const {user, token} = await registerUser(name, email, password, role)

    res.status(200).json({
        success: true,
        data: {user, token}
    })

})
exports.httpsLoginUser = asyncHandler(async function(req, res, next) {
    const { email, password } = req.body

    if(!email || !password) return next(new ErrorResponse("Provide valid email and password", 400))

    const user = await findUser(email)

    if(!user) return next(new ErrorResponse("Invalid credentials", 401))

    const result = await loginUser(email, password)

    if(!result.isMatch) return next(new ErrorResponse("Invalid credentials", 401))

    res.status(200).json({
        success: true,
        token: result.token
    })

})