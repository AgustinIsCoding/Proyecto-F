import jsonwebtoken from "jsonwebtoken"
import dotenv from  "dotenv"
import {usuarios} from "../controllers/authentication.controller.js";
dotenv.config();

function soloAdmin(req,res,next){
  const loggeado = revisarCookie(req);
  if(loggeado) return next();
  return res.redirect("/home")
}

function soloPublico(req,res,next){
  const loggeado = revisarCookie(req);
  if(!loggeado) return next();
  return res.redirect("/admin")
}

function revisarCookie(req){
  console.log("COOKIE", req.cookies)
  const cookieJWT = req.cookies.jwt
  const decodificada = jsonwebtoken.verify(cookieJWT, process.env.JWT_SECRET)
  console.log(decodificada)
  const usuarioARevisar = usuarios.find(usuario => usuario.user === decodificada.user)
  console.log(usuarioARevisar)
  if (!usuarioARevisar) {
    return false;
  }
  return true;
}
export const methods ={
  soloAdmin,
  soloPublico
}