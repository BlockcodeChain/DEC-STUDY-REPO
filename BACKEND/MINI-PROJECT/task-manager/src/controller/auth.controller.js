export const Login=(req,res)=>{
const {username}=req.body;
if(!username){
    return res.status(400).json({erro:"Username requires"})

}
req.session.user={username};
res.cookies("Username",username ,{httpOnly:true,myage:1000*60*60*24})
res.json({message:"LoginSuccessfull",username})
}
export const Logout=(req,res)=>{
    res.send('logout route')
    res.clearCookie("username")
    res.session.destroy((err)=>{
        if(err){
            return res.status(500).json({eror:"error logging out"})
        }
        res.json({message:"logout successfull"})
    })

}