const router = require("express").Router()
const {
    httpsGetAllBootcamps,
    createBootcamp,
    updateBootcamp,
    deleteBootcamp,
    httpsGetOneBootcamp
} = require("./bootcamps.controller")

router.route("/").get(httpsGetAllBootcamps).post(createBootcamp)

router.route("/:id").get(httpsGetOneBootcamp).put(updateBootcamp).delete(deleteBootcamp)

module.exports = router