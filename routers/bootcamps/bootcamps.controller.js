const {createBootcamp, getAllBootcamps, getSingleBootcamp, updateBootcamp, deleteBootcamp} = require("../../models/bootcamps/Bootcamp.model")
const ErrorResponse = require('../../utils/errorResponse');
const asyncHandler = require("../../middleware/async")

exports.httpsGetAllBootcamps = asyncHandler(async function(req, res, next) {

        const bootcamps = await getAllBootcamps()
        res.status(200).json({
            success: true,
            data: bootcamps
        })

})
exports.httpsGetOneBootcamp = asyncHandler(async function(req, res, next) {

        const bootcamp = await getSingleBootcamp(req.params.id)
        if (!bootcamp) {
            return next(new ErrorResponse(`Bootcamp not found with ID of ${req.params.id}`, 404))
        }
        res.status(200).json({
            success: true,
            data: bootcamp
        })
   
})
exports.httpsCreateBootcamp = asyncHandler(async function (req, res, next) {

        const bootcamp = await createBootcamp(req.body)
    
        res.status(201).json({
            success: true,
            data: bootcamp

        })
})

exports.httpsUpdateBootcamp = asyncHandler(async function(req, res, next) {

        const bootcamp = await getSingleBootcamp(req.params.id)
        if(!bootcamp) return next(new ErrorResponse(`Bootcamp not found with ID of ${req.params.id}`, 404))
        const updatedBootcamp = await updateBootcamp(req.params.id, req.body)
        res.status(200).json({
            success: true,
            data: updatedBootcamp
        })

})

exports.httpsDeleteBootcamp = asyncHandler(async function(req, res, next) {
        const bootcamp = await deleteBootcamp(req.params.id)
        if(!bootcamp) return next(new ErrorResponse(`Bootcamp not found with ID of ${req.params.id}`, 404))
        res.status(200).json({
            success: true,
            data: {}
        })
})

