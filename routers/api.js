const api = require("express")()

const bootcampsRouter = require("./bootcamps/bootcamps.router")

api.use("/bootcamps", bootcampsRouter)

module.exports = api