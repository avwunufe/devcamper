const { query } = require("express")
const Courses = require("./Course.mongo")
const Bootcamps = require('../bootcamps/Bootcamp.mongo');
const req = require("express/lib/request");

async function getAllCourses(params){
    let query
    if(params.bootcampId){
        query = Courses.find({
            bootcamp: params.bootcampId
        })
    } else {
        query = Courses.find({})
    }

    const courses = await query
    return {courses, pagination: {}}
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
