import productmodel from "../models/user.model.js";
export const products =async (req,res)=>{
    try{
     const {name,prize,image}=req.body
   if(!name||!prize||!image) return res.status(500).json({message:"all fields are requires"})
    // newproduct
   const newproduct =new productmodel({
    name,prize,image})
     await newproduct.save();
     res.status(201).json({message:"product added successfully",newproduct});

    }
    catch(err){
        console.log(`INTERNAL SERVER ERROR:${err.message}`);
        res.status(500).json({sucess:false,message:"INTERNAL SERVER ERROR"})
    }
  
}

export const deleted= async(req,res)=>{
try{
 const {id}=req.params;

}catch(Err){
    console.log(`INTERNAL SERVER ERROR:${Err.message}`);
    res.status(500).json({sucess:false,message:"INTERNAL SERVER ERROR"})
}
}