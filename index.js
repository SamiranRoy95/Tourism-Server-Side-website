const express = require('express')//For creating server
const { MongoClient } = require('mongodb');//For using Database
const cors=require("cors");//For useing Middleware
const ObjectId=require("mongodb").ObjectId;//For getting speciphic Id from Mongodb database
const app = express()//For calling Express server
const port =  process.env.PORT||5000//For running on Browser
require('dotenv').config()//For connectin dotenv

app.use(cors())//for using Cors
app.use(express.json())//For gettting data in frondend sie

//For connection database
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5d0ua.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });



//user=mydbuser1
//pass=2cKuKzwaTjiLcbcl


 async function run(){

try{
    await client.connect()
   
    const  database=client.db("travel");
    const coll=database.collection("homeservice")
    const  serviceColl=database.collection("servicecoll")
    const myOrdersColl=database.collection("myorders")
    const addNewService=database.collection("addnewservice")
    const recentVisit=database.collection("recentvisit")
    const teamMember=database.collection("team")
   


    // checking database connection


    

    //This is get method for homeservice
    app.get("/homeservice",async(req,res)=>{
        const cursor=coll.find({});
        
        const users= await cursor.toArray();
       
        res.send(users)

    })
    //This is get method for service page
app.get("/service",async(req,res)=>{

    const cursor=serviceColl.find({})
    const service=await cursor.toArray();
    res.send(service)
    
})

//This is get method for showing my orders
app.get("/myorders",async(req,res)=>{
console.log(req.query)
const query={};
const email=req.query.email;
if(email){

    query={email:email}
}


const cursor=myOrdersColl.find({})
const myOrder=await cursor.toArray()
res.send(myOrder)

})

//This is get method for getting new service 
app.get("/addnewservice",async(req,res)=>{
const cursor=addNewService.find({})
const result=await cursor.toArray()
res.send(result)

})

//get one item from new Service



app.get("/addnewservice/:id",async(req,res)=>{
    const id=req.params.id;
    const query={_id:ObjectId(id)};
    const user= await addNewService.findOne(query)
    
    
   
    res.send(user)
    
    
        })

app.get("/recentvisit",async(req,res)=>{
const recentvisit=recentVisit.find({})
const result= await recentvisit.toArray()
res.send(result)

})
//Team gert api
app.get("/team",async(req,res)=>{

    const team=teamMember.find({})
    const result = await team.toArray()
    res.send(result)
})

//Start POST Method
 //send data to database by post method as order/booking
 app.post("/myorders",async(req,res)=>{

    const newUser=req.body;
    
    const result= await myOrdersColl.insertOne(newUser)
    
    
    res.json(result)
    
        })

        // app.post("/homeservice",async(req,res)=>{
        //     const newService=req.body;
        //     console.log(newService)
        //     const result=await coll.insertOne(newService)
           
           
        //     res.json(result)
    
        // })


        //send data for adding a New service
        app.post("/addnewservice",async(req,res)=>{

            const newUser=req.body;
            console.log(newUser);
            const result= await addNewService.insertOne(newUser)
            console.log(result)
            
            res.json(result)
            
                })


                


//Delete API
app.delete("/myorders/:id",async(req,res)=>{
    const id=req.params.id;
    const query={_id:ObjectId(id)};
    const result =await myOrdersColl.deleteOne(query);
    console.log("deleting id",result)
    res.json(result)

    
})





}
finally{
    // await client.close()
}


}
run().catch(console.dir)

app.get('/', (req, res) => {
  res.send('Tourism Tourism  Website')
})

app.listen(port, () => {
  console.log("This is servie",port)
})

