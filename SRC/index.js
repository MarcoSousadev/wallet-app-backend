require('dotenv').config()
const express = require('express')
const cors = require('cors')
const db = require('./db')
const routesCategories = require('./routes/categories')
const routerUser = require('./routes/users')
const routesFinances = require('./routes/finances')

const app = express()
app.use(
  cors({
    origin: '*'
  })
)
app.use(express.json())

const port = process.env.PORT

app.get('/', (req, res) => {
  res.send('Olá, essa é a aplicação Wallet APP!')
})

app.use('/categories', routesCategories)
app.use('/users', routerUser)
app.use('/finances', routesFinances)

app.listen(port, () => {
  db.connect()
    .then(() => {
      console.log('DB connected')
    })
    .catch(error => {
      throw new Error(error)
    })
  console.log(`Example app listening on port ${port}`)
})
