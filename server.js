//mongodb+srv://<userName>:<password>@cluster0.igmsqwf.mongodb.net/

const express=require('express');

const cors= require('cors');

const mongoose= require('mongoose');

const app = express();
app.use(express.json());
app.use(cors());

const schema= mongoose.Schema({
    userName:String,
    email:String,
},{
    timestamps:true
})

const user=mongoose.model('student',schema);

// crud 

// Read Operation

app.get('/',async(req,res)=>{
const data= await  user.find({});
res.json({success:true, content: "All Data Viewd successfully",data:data})
})

app.post('/create',async(req,res)=>{

    const data=await new user(req.body);
    await data.save()
    res.json({success:true, content:"Data inserted successfully",data:data})

})

app.put('/update',async(req,res)=>{
const {_id,...rest}= req.body;
const data= await user.updateOne({_id:_id},rest);
res.json({success:true, content:"Data Updated successfully",data:data})
})

app.delete('/delete/:id',async(req,res)=>{

   const _id = req.params.id

   const data=await user.deleteOne({_id:_id})

   res.json({success:true, content:"Data Deleted successfully",data:data})



})


mongoose.connect('mongodb+srv://alphonsekumarbs:v5eu4zwvr@cluster0.ivmyku3.mongodb.net/').then(
   ()=> console.log('Database Connected')
).catch((error)=>console.log(error))

app.listen(8000,()=>{
    console.log('server started')
})