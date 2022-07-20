const app = require("./app")
const http = require("http")
require("dotenv").config()

const { mongoConnect } = require("./services/mongo")


const PORT = process.env.PORT || 8000
    


const httpServer = http.createServer(app)
mongoConnect()
const server = httpServer.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`);
})

process.on("unhandledRejection", (err, promise)=>{
    console.log(`Error: ${err.message}`);
    server.close(()=>{process.exit(1)})
})