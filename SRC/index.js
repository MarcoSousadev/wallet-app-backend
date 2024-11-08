const express = require('express')
const db = require('./db')
const routesCategories = require('./routes/categories')
const routerUser = require('./routes/users')

const app = express()
app.use(express.json())

const port = 3000

app.get('/', (req, res) => {
  res.send('Olá, essa é a aplicação Wallet APP!')
})

app.use('/categories', routesCategories)
app.use('/users', routerUser)

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
