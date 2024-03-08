import app from "./app.js"
import { connectToDatabase } from "./db/connection.js";




//Connection database and listenner server
const PORT = process.env.PORT || 5000;
connectToDatabase().then(()=>{
  app.listen(PORT, ()=>{
    console.log(`Server is running on Port:${PORT} and connect to database.`);
  })
}).catch((error)=>{
  console.log(error)
})


