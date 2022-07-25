const api = require("express")()

const bootcampsRouter = require("./bootcamps/bootcamps.router")
const coursesRouter = require("./courses/courses.router")
const authRouter = require("./auth/auth.router")

api.use("/bootcamps", bootcampsRouter)
api.use("/courses", coursesRouter)
api.use("/auth", authRouter)

module.exports = api