const endpoints = require('../endpoints.json')

const getApiEndpoints = (req, res) => {
    res.status(200).send({endpoints})
 }
module.exports = getApiEndpoints
