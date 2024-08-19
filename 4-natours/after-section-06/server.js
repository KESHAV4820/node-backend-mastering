const mongoose= require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });

// to connect to the remotely hosted database. 
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose.connect(DB, {

// mongoose.connect(process.env.DATABASE_LOCAL,{  //Remember It we use this syntex if we are connecting to local hosted database. Only This much changes.😎 
      useNewUrlParser:true, 
      useCreateIndex: true, 
      useFindAndModify: false
}// is recipe! not concept
).then(returnedConnectionObject => {
  console.log(returnedConnectionObject.connections);// Code Testing
  console.log("DB connection successful!!");
  
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
