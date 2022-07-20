const express = require("express")
const morgan = require("morgan")
const app = express()

if(process.env.NODE_ENV === "development"){
    app.use(morgan("dev"))
}

app.use(express.json())
const apiv1 = require("./routers/api")


app.use("v1", apiv1)
module.export = app