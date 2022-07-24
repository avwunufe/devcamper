const api = require("express")()

const bootcampsRouter = require("./bootcamps/bootcamps.router")
const coursesRouter = require("./courses/courses.router")

api.use("/bootcamps", bootcampsRouter)
api.use("/courses", coursesRouter)

module.exports = api