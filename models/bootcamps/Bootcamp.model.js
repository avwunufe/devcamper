const Bootcamps = require("./Bootcamp.mongo")
const geocoder = require("../../utils/geocoder")
const advancedResult = require('../../utils/advancedResults');

async function createBootcamp(data){
    const bootcamp = await Bootcamps.create(data)

    return bootcamp
}

async function getAllBootcamps(query){
    const reqQuery = { ...query }

    let queryStr = JSON.stringify(reqQuery)
    const total = await Bootcamps.countDocuments()

    let databaseQuery = Bootcamps.find(JSON.parse(queryStr)).populate("courses")

    const { databaseQueryFinal, pagination } = advancedResult(databaseQuery, query, total);


    const bootcamps = await databaseQueryFinal;
    
    return {bootcamps, pagination}
}

async function getSingleBootcamp(id){
    const bootcamp = await Bootcamps.findById(id)
    return bootcamp
}

async function updateBootcamp(id, data){
    const updated = await Bootcamps.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true
    })
    return updated

}

async function deleteBootcamp(id){
    const bootcamp = await Bootcamps.findById(id)
    await bootcamp.remove()
    return bootcamp
}

async function getBootcampByRadius(zipcode, distance){
    const loc = await geocoder.geocode(zipcode)
    const lat = loc[0].latitude
    const lon = loc[0].longitude
    const radiusOfEarth = 3963
    const radius = distance / radiusOfEarth
    const bootcamps = await Bootcamps.find({
        location: { $geoWithin: { $centerSphere: [ [lon, lat], radius ] } }
    })
    return bootcamps
}

module.exports = {
    createBootcamp,
    getAllBootcamps,
    getSingleBootcamp,
    updateBootcamp,
    deleteBootcamp,
    getBootcampByRadius
}