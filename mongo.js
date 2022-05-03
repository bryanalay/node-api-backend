const mongoose = require('mongoose')

const conectionString = process.env.MONGO_DB_URI

// coneccion a mongodb
mongoose.connect(conectionString)
  .then(() => {
    console.log('Datebase Connected')
  }).catch(err => {
    console.error(err)
  })
