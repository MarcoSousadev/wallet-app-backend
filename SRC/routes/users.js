const express = require('express')
const router = express.Router()
const db = require('../db')
const usersQueries = require('../Queries/users')

router.post('/', async (req, res) => {
  try {
    const { name, email } = req.body
    if (name.lenght < 3) {
      return res
        .status(400)
        .json({ error: 'Name should have more than 3 characters' })
    }

    if (email.lenght < 5 || !email.includes('@')) {
      return res.status(400).json({ error: 'e-mail is invalid' })
    }
    const query = usersQueries.findByEmail(email)

    const alredyExists = await db.query(query)

    if (alredyExists.rows[0]) {
      return res.status(403).send({ error: 'User alredy exists' })
    }

    const text = 'INSERT INTO users(name, email) VALUES ($1, $2) RETURNING *'
    const values = [name, email]
    const createResponse = await db.query(text, values)
    if (!createResponse.rows[0]) {
      return res.status(400).json({ error: 'User not created' })
    }
    return res.status(200).json(createResponse.rows[0])
  } catch (error) {
    return res.status(500).json(error)
  }
})

router.put('/', async (req, res) => {
  try {
    const oldEmail = req.headers.email
    const { name, email } = req.body
    if (name.lenght < 3) {
      return res
        .status(400)
        .json({ error: 'Name should have more than 3 characters' })
    }

    if (email.lenght < 5 || !email.includes('@')) {
      return res.status(400).json({ error: 'e-mail is invalid' })
    }
    if (oldEmail.lenght < 5 || !email.includes('@')) {
      return res.status(400).json({ error: 'e-mail is invalid' })
    }
    const query = usersQueries.findByEmail(oldEmail)

    const alredyExists = await db.query(query)

    if (!alredyExists.rows[0]) {
      return res.status(404).send({ error: 'User does exists' })
    }

    const text = 'UPDATE users SET name=$1, email=$2 WHERE email=$3 RETURNING *'
    const values = [name, email, oldEmail]

    const updateResponse = await db.query(text, values)

    if (!updateResponse.rows[0]) {
      return res.status(404).send({ error: 'User not updated' })
    }
    return res.status(200).json(updateResponse.rows[0])
  } catch (error) {
    return res.status(500).json(error)
  }
})

router.get('/', async (req, res) => {
  try {
    const { email } = req.query

    if (!email || email.length < 5 || !email.includes('@')) {
      return res.status(400).json({ error: 'E-mail is invalid.' })
    }

    const query = usersQueries.findByEmail(email)
    const userExists = await db.query(query)
    if (!userExists.rows[0]) {
      return res.status(404).json({ error: 'User does not exits.' })
    }

    return res.status(200).json(userExists.rows[0])
  } catch (error) {
    return res.status(500).json(error)
  }
})


module.exports = router
