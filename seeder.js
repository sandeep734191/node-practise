const mongoose=require('mongoose')
const BootCamps=require('./models/Bootcamp')
const fs=require('fs')
const colors=require('colors')
require('dotenv').config({path:'./config/config.env'})

const bootcamps=JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`,'utf-8'))
// console.log(bootcamps);

const connectDb = async () => {
    let conn;
    try{

    
         conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: true,
          });  

          console.log(`connected to mongo cloud ${conn.connection.host}`.cyan.underline.bold);
        }catch(err){
            console.log(err)
        }
};


console.log('======================bootcamp data======================')
const createData=async ()=>{
    await connectDb();
    try{
        await BootCamps.create(bootcamps);
        console.log('data imported'.green.inverse)
        process.exit();
    }catch(err){
        console.log(err)
    }
}

const deleteData=async ()=>{
    await connectDb();
    try{
        await BootCamps.deleteMany();
        console.log('data deleted'.green.inverse)
        process.exit();
    }catch(err){
        console.log(err)
    }
}

if(process.argv[2]==='-i'){
    createData();
}else if(process.argv[2]==='-d'){
    deleteData();
}
