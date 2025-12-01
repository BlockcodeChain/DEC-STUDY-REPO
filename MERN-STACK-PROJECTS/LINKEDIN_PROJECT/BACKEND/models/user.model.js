import mongoose from 'mongoose'
const userSchema=new mongoose.Schema({
     firstName:{
        type:String,
        required:true
     },
     lastName:{
        type:String,
        required:true
     },
     userName:{
        type:String,
        unique:true,
        required:true
     },
      email:{
        type:String,
        unique:true,
        required:true
     },
      password:{
        type:String,
        required:true
     },
      profileimage:{
        type:String,
        default:""
     },
     coverimage:{
        type:String,
        default:""
     },
    headlines:{
        type:String,
        default:""
     },
     skills:[{type:String}],
     education:[
        {
            college:{type:String},
            degree:{type:String},
            filedOfStudy:{type:String},

        }
     ],
     location:{
        type:String
     },
     gender:{
        type:String,
        // jb option ki baat aati hai tb enum use krte hai hum
        enum:["male","Female","other"]
     },
     experience:[{
        title:{type:String},
        company:{type:String},
        description:{type:String}
     }
    ],
    connection:[
       { type:mongoose.Schema.Types.ObjectId,
        ref:userSchema
       }
    ]



},{timestamps:true})