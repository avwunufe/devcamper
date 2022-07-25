const advancedResult = function (databaseQuery, query, total) {
    const reqQuery = { ...query }

    let queryStr = JSON.stringify(reqQuery)

    const removeFiels = ["select", "sort", "page", "limit"]

    removeFiels.forEach(param => delete reqQuery[param])

    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`)
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

    databaseQueryFinal = databaseQuery.skip(startIndex).limit(limit)
    
    
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
    return {databaseQueryFinal, pagination}
}

module.exports = advancedResult