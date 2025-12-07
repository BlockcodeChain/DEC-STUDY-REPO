import mongoose from 'mongoose'

const productSchema =new mongoose.Schema({
    name:{
        type:String,
        requires:true

    },
    prize:{
        type:String,
        requires:true

    },
    image:{
        type:String,
        requires:true

    }
},{timestamps:true})

const productmodel=mongoose.model("Product",productSchema);
export default productmodel;
