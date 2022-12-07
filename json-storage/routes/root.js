const router = require('express').Router()
const { addRoute, getRoute, updateRoute, deleteRoute } = require('../controllers/rootController')

router
  .get('/*', getRoute)
  .post('/*', addRoute)
  .put('/*', updateRoute)
  .delete('/*', deleteRoute)

module.exports = router