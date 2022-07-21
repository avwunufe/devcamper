const Bootcamps = require("./Bootcamp.mongo")

async function createBootcamp(data){
    const bootcamp = await Bootcamps.create(data)
    return bootcamp
}

async function getAllBootcamps(){
    const bootcamps = await Bootcamps.find({})
    return bootcamps
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
    const bootcamp = await Bootcamps.findByIdAndDelete(id)
    return bootcamp
}
module.exports = {
    createBootcamp,
    getAllBootcamps,
    getSingleBootcamp,
    updateBootcamp,
    deleteBootcamp
}