const mongoose = require("mongoose");
const connectDb = async () => {
    let conn;
    // try{
         conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: true,
          });
        
          console.log(`connected to mongo cloud ${conn.connection.host}`.cyan.underline.bold);
    // }catch(err){
    //     console.log('error in connection to database')
    //     console.log(err);
    // }
 
};

module.exports = connectDb;
