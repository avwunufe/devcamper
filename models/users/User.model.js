const Users = require("./User.mongo")

async function findUser(email) {

    const user = await Users.findOne({ email }).select("+password")

    return user
}
async function registerUser(name, email, password, role) {
    const user = await Users.create({name, email, password, role})

    const token = user.getSignedJwtToken()
    
    return {user, token}
}
async function loginUser(email, password) {
    
    const user = await Users.findOne({ email }).select("+password")
    
    const isMatch = await user.matchPassword(password)
    
    if (!isMatch) {
        return { isMatch: false }
    }
    const token = user.getSignedJwtToken()

    return { isMatch, token }
}

module.exports = {
    registerUser,
    findUser,
    loginUser
}