const router = require("express").Router()
const {
    httpsGetAllBootcamps,
    httpsCreateBootcamp,
    httpsUpdateBootcamp,
    httpsDeleteBootcamp,
    httpsGetOneBootcamp
} = require("./bootcamps.controller")

router.route("/").get(httpsGetAllBootcamps).post(httpsCreateBootcamp)

router.route("/:id").get(httpsGetOneBootcamp).put(httpsUpdateBootcamp).delete(httpsDeleteBootcamp)

module.exports = router