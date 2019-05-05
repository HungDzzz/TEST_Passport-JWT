const config = require('./config')

const error = function (req, res, error, status) {
    res.send({success: false, error: error.message ? error.message : error, status : status})
}

const success = function (res, data, page) {
    var obj = {success: true}
    obj.data = data
    if(data && typeof data.page !== 'undefined' && data.page >= 0) {
        data.next_page = parseInt(data.page) + 1
        data.PAGE_SIZE = config.PAGE_SIZE
    }

    else if(data && typeof page != 'undefined') {
        obj.next_page = parseInt(page) + 1
        obj.PAGE_SIZE = config.PAGE_SIZE
    }

    if(data && typeof data.total_data != 'undefined')
    {
        obj.total_data = data.total_data
        delete data.total_data
    }

    res.status(200)
    res.send(obj)
}

module.exports = {
    error,
    success
}