const { query } = require("express")
const Courses = require("./Course.mongo")
const Bootcamps = require('../bootcamps/Bootcamp.mongo');
const advancedResult = require('../../utils/advancedResults');

async function getAllCourses(params, query){
    let databaseQuery
    const total = await Courses.countDocuments()
    if(params.bootcampId){
        databaseQuery = Courses.find({
            bootcamp: params.bootcampId
        })
    } else {
        databaseQuery = Courses.find({}).populate({
            path: "bootcamp",
            select: "name description"
        })
    }

    const { databaseQueryFinal, pagination } = await advancedResult(databaseQuery, query, total)

    const courses = await databaseQueryFinal;

    return {courses, pagination }
}

async function getOneCourse(id){
    const course = await Courses.findById(id).populate({
        path: "bootcamp",
        select: "name description"
    })

    return course
}

async function addOneCourse(reqBody, params){
    reqBody.bootcamp = params.bootcampId
    const course = await Courses.create(reqBody)

    return course
}

async function updateCourse(id, reqBody){
    const updatedCourse = await Courses.findByIdAndUpdate(id, reqBody, {
        new: true,
        runValidators: true
    })

    return updatedCourse
}

async function deleteCourse(id) {
    const course = await getOneCourse(id)
    await course.remove();

    return 
}

module.exports = {
    getAllCourses,
    getOneCourse,
    addOneCourse,
    updateCourse,
    deleteCourse
}
