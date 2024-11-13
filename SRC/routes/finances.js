const express = require('express')
const router = express.Router()
const db = require('../db')
const categoriesQueries = require('../Queries/categories')
const usersQueries = require('../Queries/users')

router.post('/', async (req, res) => {
  try {
    const { email } = req.headers
    const { category_id, title, date, value } = req.body

    if (email.length < 5 || !email.includes('@')) {
      return res.status(400).json({ error: 'e-mail is invalid' })
    }
    if (!category_id) {
      return res.status(400).json({ error: 'Category Id is mandatory' })
    }

    if (!title && title.length < 3) {
      return res.status(400).json({
        error: 'Title is mandatory and should have more than 3 characters'
      })
    }
    if (!value) {
      return res.status(400).json({ error: 'Value is mandatory' })
    }

    if (!date || date.length !== 10) {
      return res
        .status(400)
        .json({ error: 'Date is mandatory and should be in format yyyy-mm-dd' })
    }

    const userQuery = await db.query(usersQueries.findByEmail(email))
    if (!userQuery.rows[0]) {
      return res.status(404).send({ error: 'User does exists' })
    }

    const category = await db.query(categoriesQueries.findById(category_id))

    if (!category.rows[0]) {
      return res.status(404).send({ error: 'Category not found' })
    }

    const text =
      'INSERT INTO finances(user_id,category_id,date,title,value) VALUES($1,$2,$3,$4,$5) RETURNING *'
    const values = [userQuery.rows[0].id, category_id, date, title, value]

    const createResponse = await db.query(text, values)
    if (!createResponse.rows[0]) {
      return res.status(500).json({ error: 'Finance row not created' })
    }

    return res.status(200).json(createResponse.rows[0])
  } catch (error) {
    return res.status(500).json(error)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { email } = req.headers

    if (email.length < 5 || !email.includes('@')) {
      return res.status(400).json({ error: 'e-mail is invalid' })
    }
    if (!id) {
      return res.status(400).json({ error: 'Id is mandatory' })
    }
    const userQuery = await db.query(usersQueries.findByEmail(email))
    if (!userQuery.rows[0]) {
      return res.status(404).send({ error: 'User does exists' })
    }

    const findFinancesText = 'SELECT * FROM finances WHERE id=$1'
    const findFinancesValue = [Number(id)]
    const financeItemQuery = await db.query(findFinancesText, findFinancesValue)

    if (!financeItemQuery.rows[0]) {
      return res.status(400).json({ error: 'finance row not found' })
    }

    if (financeItemQuery.rows[0].user_id !== userQuery.rows[0].id) {
      return res
        .status(401)
        .send({ error: 'Finance row does not belong to user' })
    }

    const text = 'DELETE FROM finances WHERE id=$1 RETURNING *'
    const values = [Number(id)]
    const deleteResponse = await db.query(text, values)

    if (!deleteResponse.rows[0]) {
      return res.status(400).json({ error: 'finance row not deleted' })
    }
    return res.status(200).json(deleteResponse.rows[0])
  } catch (error) {
    return res.status(500).json({ error })
  }
})

module.exports = router
