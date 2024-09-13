const mongoose=require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI;

const connectmonogo=async()=>{
   try {
     const mongoconnection=await mongoose.connect(MONGODB_URI);
     if(mongoconnection.connection.readyState===1){
        console.log('Db connected successfully');
        return true;
     }
   } catch (error) {
      console.log('connection failed',error);
      return false;
      
   }
}
module.exports=connectmonogo;