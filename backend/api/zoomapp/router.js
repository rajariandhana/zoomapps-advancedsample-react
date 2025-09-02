const { Router } = require('express')
const router = Router()
const controller = require('./controller')
const { Note } = require('../../models/note')

router
  .use('/proxy', controller.proxy)
  .use('/sockjs-node', controller.proxy)
  .get('/install', controller.install)
  .get('/auth', controller.auth)
  .get('/home', controller.home)
  .get('/authorize', controller.inClientAuthorize)
  .post('/onauthorized', controller.inClientOnAuthorized)
  .get('/notes', async (req, res) => {
    const notes = await Note.findAll()
    res.json(notes)
  })
  .post('/notes', async (req, res) => {
    try {
      const user = await Note.create(req.body)
      res.json(user)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  })
  .delete('/notes/:id', async (req, res) => {
    try {
      const id = req.params.id
      const note = await Note.findByPk(id)

      if (!note) {
        return res.status(404).json({ error: 'Note not found' })
      }

      await note.destroy()
      res.status(204).end()
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  })

module.exports = router
