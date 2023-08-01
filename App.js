// const http =require('http')
// const fs=require('fs')
// http.createServer(function(req,res){
// fs.readFile('index.html',function(err,data){

// res.writeHead(200,{'Content-Type':'text/html'})
// res.end('reda')})

// }).listen(80)
// console.log("server is running on port 80")

//synchronous  asynchronous

// const listItems=function(items){
//     items.forEach(function (item) {
//         console.log(item)
        
//     });
// }
// const items=["milk,tea,coafe"]
// listItems(items)
// setTimeout(function () {
//     console.log("hello")
// }, 5000);


// const one =function(){
//     setTimeout(function () {
//         console.log("one")
        
//     }, 100);
// }
// const two =function(){
//     setTimeout(function () {
//         console.log("two")
        
//     }, 500);
// }
// const three =function(){

//         console.log("three")


// }
// one()
// two()
// three()

// const express = require ('express')
// const app =express()

// app.use(function(req,res,next)    //middle ware
// {
//     console.log("anew request is recieved at " + new Date().toISOString())
//     next()
// })




// app.get('/',function(req,res){
//     res.send("hello "+req.query.name)})      //query

// //     app.get('/user/:id',function(req,res){
// //         res.send("hello user " +req.params.id)    //param
// // })

// app.get('/user/:id',function(req,res){
//     res.json({name:"mohamed",id:req.params.id})  //param API json
// })
// app.listen(8080)




// const express = require('express')
// const bodyparser =require('body-parser')
// const app = express()

// app.use(bodyparser.json())

// let =users = []

// app.get ("/users",function(req,res){
//     res.json({users:users,message:"done"})
// })

// app.post("/users" ,function(req,res){
//     users.push(req.body)
//     res.json({Message:"done user aded sucsseful"})
// })

// app.put("/users",async function(req,res){
//     let{name,phone}=req.body
//     await users.find((usr,index)=>{
//         if(usr.name===name){
//             users[index] ={name:usr.name,phone:phone}
//             return true
//         } 
//     })
//     res.json({Message:"done user updated sucsseful"})
// })

// app.delete("/users",async function(req,res){
//     let{name}=req.body
//     await users.find((usr,index)=>{
//         if(usr.name===name){
//             users.splice(users[index],1)
//             return true
//         } 
//     })
//     res.json({Message:"done user deleted sucsseful"})
// })

// app.listen(8080)






const express = require('express')
const mongoose =require('mongoose');
const userModel = require('./user.schema')


const app = express()
const bodyParser= require('body-parser')
const url = "mongodb+srv://aboreda:22050731@aboreda.cm2comv.mongodb.net/?retryWrites=true&w=majority"
const connectDB =async()=> {
    try{
        mongoose.set('strictQuery',false)
        mongoose.connect(url)
        console.log("connected to mongo DB")
    }catch(err){
        console.log("errore while connect to mongo"+err)
        process.exit()
    }
}
connectDB()

app.use(bodyParser.json());

let =users = []

app.get ("/users",async function(req,res){
    let allUsers=await userModel.find()
    res.json({Users:allUsers,Status:200})
})

app.post("/users" , async function(req,res){
    console.log(req.body)
    let{name,email,age,phone}=req.body
    const user={
        name:name,
        email:email,
        age:age,
        phone:phone
    }
    let createdUser= await userModel.create(user)
    res.json({Message:"done user aded sucsseful" , statuse:200 , user:createdUser})
})

app.put("/users/:id",async function(req,res){
    let payload=req.body
    await userModel.findByIdAndUpdate(req.params.id,payload)
    
    res.json({Message:"done user updated sucsseful", status:200})
})

app.delete("/users/:id",async function(req,res){
    
    await userModel.findByIdAndDelete(req.params.id)
    
    res.json({Message:"done user deleted sucsseful", status:200})
})

app.listen(8080)