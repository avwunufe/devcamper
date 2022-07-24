const router = require("express").Router({mergeParams: true})
const {
    httpsGetAllCourses,
    httpsGetOneCourse,
    httpsAddOneCourse,
    httpsUpdateCourse
} = require("./courses.controller")

router.route("/").get(httpsGetAllCourses).post(httpsAddOneCourse)
router.route("/:id").get(httpsGetOneCourse).put(httpsUpdateCourse)

// router.route("/:id").get(httpsGetOneBootcamp).put(httpsUpdateBootcamp).delete(httpsDeleteBootcamp)

module.exports = router