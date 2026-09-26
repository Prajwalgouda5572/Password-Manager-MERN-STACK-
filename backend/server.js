import express from 'express';
import cors from "cors"
import mongoose from 'mongoose';
import dotenv from 'dotenv';

const app = express();

app.use(cors())
app.use(express.json());
dotenv.config()

mongoose.connect(`${process.env.Mongodb_url}Pass-manager`)

const passwordSchema = new mongoose.Schema({
  id:String,
  website: String,
  username: String,
  password: String
});

const passwords=mongoose.model("passwords",passwordSchema)

const create= async(form)=>{
  let b=await passwords.create({id:form.id,website:form.website, username:form.username, password:form.password})
}

app.get('/', async(req, res) => {
  let passwordarray=await passwords.find()
  res.json(passwordarray)
});

app.post('/', async(req, res) => {
   let form=req.body;
   create(form)
   res.json({message:"Password Saved",data:form})
});

app.delete('/:id', async(req, res) => {
    let reqid=req.params.id
    let s=await passwords.deleteOne({id:reqid})
    res.json({message:"Password deleted"})
});

app.listen(process.env.port, () => {
  console.log(`Example app listening on port ${process.env.port}`);
}); 