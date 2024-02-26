import bcryptjs from "bcryptjs";

const usuarios =[{
  user:"a",
  email:"a@a.com",
  password:"a"
}]

async function login(req,res){

}

async function register(req,res) {
  console.log(req.body);
  const user = req.body.user;
  const password = req.body.password;
  const  email = req.body.email;
  if(!user || !password || !email ){
    return res.status(400).send({status:"Error", message:"Faltan datos por ingresar"})
  }
  const emailARevisar = usuarios.find((usuario)=>usuario.user===user);
  if(emailARevisar){
    console.log(password)
    return res.status(400).send({status:"Error", message:"Este correo ya esta registrado"})
  }
  const salt= await bcryptjs.genSalt(10);
  const hashPassword=await bcryptjs.hash(password,salt);
  const nuevoUsuario={
    user, email, password:hashPassword
  }
  usuarios.push(nuevoUsuario);
  console.log("dadasdsa")
  console.log(usuarios)
  return res.status(201).send({status: "Ok", message:`Usuario ${nuevoUsuario.user} agregado`, redirect:"/login"})
}

export const methods={
  login,
  register
}