const express = require("express")
const app = express()
const apiv1 = require("./routers/api")


app.use(express.json())
app.use("v1", apiv1)
module.export = app