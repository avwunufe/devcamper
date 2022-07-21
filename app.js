const express = require("express")
const morgan = require("morgan")
const app = express()
const apiv1 = require("./routers/api")
const errorHandler = require("./middleware/error")

if(process.env.NODE_ENV === "development"){
    app.use(morgan("dev"))
}

app.use(express.json())


app.use("/v1", apiv1)
app.use(errorHandler)
module.exports = app