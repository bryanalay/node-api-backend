const mongoose = require('mongoose')

const conectionString = process.env.MONGO_DB_URI

// conexion a mongodb
mongoose.connect(conectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000
})
  .then(() => {
    console.log('Datebase Connected')
  }).catch(err => {
    console.error(err)
  })
