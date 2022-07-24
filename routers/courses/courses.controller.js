const { getAllCourses, getOneCourse, addOneCourse, updateCourse, deleteCourse } = require("../../models/courses/Course.model")
const ErrorResponse = require('../../utils/errorResponse');
const asyncHandler = require("../../middleware/async")
const Bootcamps = require('../../models/bootcamps/Bootcamp.mongo');
const BootcampMongo = require("../../models/bootcamps/Bootcamp.mongo");

exports.httpsGetAllCourses = asyncHandler(async function(req, res, next) {
    const data = await getAllCourses(req.params)
    res.status(200).json({
        success: true,
        data: data.courses,
        // pagination: result.pagination
    })
    
})

exports.httpsGetOneCourse = asyncHandler(async function(req, res, next) {
    const course = await getOneCourse(req.params.id)
    if(!course) return next(new ErrorResponse(`No course with the id of ${req.params.id}`, 404))
    res.status(200).json({
        success: true,
        data: course
        // pagination: result.pagination
    })

})

exports.httpsAddOneCourse = asyncHandler(async function(req, res, next) {

    const bootcamp = await Bootcamps.findById(req.params.bootcampId)

    if(!bootcamp) return next(new ErrorResponse(`No bootcamp with the id of ${req.params.bootcampId}`, 404))

    const course = await addOneCourse(req.body, req.params)
    res.status(200).json({
        success: true,
        data: course
        // pagination: result.pagination
    })

})
exports.httpsUpdateCourse = asyncHandler(async function(req, res, next) {

    const course = await getOneCourse(req.params.id)
    if(!course) return next(new ErrorResponse(`No course with the id of ${req.params.id}`, 404))

    const updatedCourse = await updateCourse(req.params.id, req.body)
    res.status(200).json({
        success: true,
        data: updatedCourse
        // pagination: result.pagination
    })

})

exports.httpsDeleteCourse = asyncHandler(async (req, res, next) => {
    const course = await getOneCourse(req.params.id)
  
    if (!course) {
      return next(
        new ErrorResponse(`No course with the id of ${req.params.id}`),
        404
      );
    }

    await deleteCourse(req.params.id)
  
    res.status(200).json({
      success: true,
      data: {}
    });
  });
  

// exports.httpsGetAllBootcamps = asyncHandler(async function(req, res, next) {


// })
// exports.httpsGetAllBootcamps = asyncHandler(async function(req, res, next) {


// })
// exports.httpsGetAllBootcamps = asyncHandler(async function(req, res, next) {


// })