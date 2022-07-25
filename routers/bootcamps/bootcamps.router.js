const router = require("express").Router()
const {
    httpsGetAllBootcamps,
    httpsCreateBootcamp,
    httpsUpdateBootcamp,
    httpsDeleteBootcamp,
    httpsGetOneBootcamp,
    httpsGetOneBootcampByRadius,
    httpsBootcampPhotoUpload
} = require("./bootcamps.controller")
const courseRouter = require("../courses/courses.router")

router.use("/:bootcampId/courses", courseRouter)
router.route("/radius/:zipcode/:distance").get(httpsGetOneBootcampByRadius)

router.route("/").get(httpsGetAllBootcamps).post(httpsCreateBootcamp)

router.route("/:id").get(httpsGetOneBootcamp).put(httpsUpdateBootcamp).delete(httpsDeleteBootcamp)

router.route("/:id/photo").put(httpsBootcampPhotoUpload)

module.exports = router