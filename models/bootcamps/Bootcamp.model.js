const Bootcamps = require("./Bootcamp.mongo")
const geocoder = require("../../utils/geocoder")

async function createBootcamp(data){
    const bootcamp = await Bootcamps.create(data)
    return bootcamp
}

async function getAllBootcamps(query){
    const reqQuery = { ...query }
    let queryStr = JSON.stringify(reqQuery)
    const removeFiels = ["select", "sort", "page", "limit"]
    removeFiels.forEach(param => delete reqQuery[param])

    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`)
    let databaseQuery = Bootcamps.find(JSON.parse(queryStr)).populate("courses")
    if(query.select){
        const fields = query.select.split(",").join(" ")
        databaseQuery = databaseQuery.select(fields)

    }
    if(query.sort){
        const sortBy = query.sort.split(",").join(" ")
        databaseQuery = databaseQuery.sort(sortBy)
    } else {
        databaseQuery = databaseQuery.sort("-createdAt")
    }

    const page = +query.page || 1
    const limit = +query.limit || 10
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const total = await Bootcamps.countDocuments()

    databaseQuery = databaseQuery.skip(startIndex).limit(limit)
    
    const bootcamps = await databaseQuery
    const pagination = {}
    if(endIndex < total){
        pagination.next = {
            page: page + 1,
            limit
        }
    }
    if(startIndex > 0){
        pagination.prev = {
            page: page - 1,
            limit
        }
    }
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