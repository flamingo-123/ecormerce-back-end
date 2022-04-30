const mongoose = require('mongoose')
const DBconnection = async () => {
  const conn = await mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
    })
    .catch(err => {
      console.log(`For some reasons we couldn't connect to the DB`.red, err)
    })
}

module.exports = DBconnection