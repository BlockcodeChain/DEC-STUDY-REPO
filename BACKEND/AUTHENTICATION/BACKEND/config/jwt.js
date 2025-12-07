import jwt from 'jsonwebtoken'

const generatetoken =(id)=>{
    let token = jwt.sign(id,process.env.JWTSECRET,{expiresIn:"7d"})
    return token;
}
export default generatetoken;