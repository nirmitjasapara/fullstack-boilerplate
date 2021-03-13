const path = require('path')
const express = require('express')
const xss = require('xss')
const { requireAuth } = require('../middleware/jwt-auth')
const EndpointService = require('./endpoint-service')

const endpointRouter = express.Router()
const jsonParser = express.json()

const serialize = endpoint => ({
  id: endpoint.id,
  name: xss(endpoint.name),
  modified: endpoint.modified,
  user_id: endpoint.user_id
})

endpointRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    EndpointService.getAll(knexInstance)
      .then(data => {
        res.json(data.map(serialize))
      })
      .catch(next)
  })
  .post(requireAuth, jsonParser, (req, res, next) => {
    const { name, modified } = req.body
    const newData = { name }

    for (const [key, value] of Object.entries(newData))
      if (value == null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        })

    newData.modified = modified;
    newData.user_id = req.user.id

    EndpointService.insert(
      req.app.get('db'),
      newData
    )
      .then(data => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${data.id}`))
          .json(serialize(data))
      })
      .catch(next)
  })

endpointRouter
  .route('/:_id')
  .all((req, res, next) => {
    EndpointService.getById(
      req.app.get('db'),
      req.params._id
    )
      .then(data => {
        if (!data) {
          return res.status(404).json({
            error: { message: `/* TODO */ doesn't exist` }
          })
        }
        res.data = data
        next()
      })
      .catch(next)
  })
  .get((req, res, next) => {
    res.json(serialize(res.data))
  })
  .delete(requireAuth, (req, res, next) => {
    if (res.data.user_id != req.user.id) {
      return res.status(404).json({
        error: { message: `Unauthorized delete` }
      })
    }
    EndpointService.delete(
      req.app.get('db'),
      req.params._id
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })

module.exports = endpointRouter