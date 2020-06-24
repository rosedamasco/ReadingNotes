const mongoose = require('mongoose');

const MONGO_URI = 'YOUR_URI_HERE';

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'readers',
  })
  .then(() => console.log('Connected to Mongo DB.').catch((err) => console.log(err)));

  const Schema = mongoose.Schema;

  const readersModel = new Schema({
    name: String,
    userid: String,
    books:: { type : Array , "default" : [] }
  })
