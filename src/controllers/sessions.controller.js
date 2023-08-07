import userModel from "../dao/models/user.js";
import User from "../dao/models/user.dao.js";

const userServiceDAO = new User();

const gitHub = async (req, res) => {};
const githubcallback = async (req, res) => {
  console.log("usuario recibe gitHub -> ", req.user);
  let idUser = JSON.stringify(req.user._id);
  let id = "";
  id = idUser.split('"');
  console.log(id[1]);
  req.session.user = {
    first_name: req.user.first_name,
    last_name: req.user.last_name,
    email: req.user.email,
    id: id[1],
    age: req.user.age,
  };
  console.log(req.session.user);
  res.redirect("/api/products");
};

const register = async (req, res) => {
  console.log("Entro a registrar un user...");
  res.status(201).json({ status: "success", message: "Usuario Registrado" });
};

const login = async (req, res) => {
  //console.log("entro a loguearse, ", req.user);
  req.logger.info("ENTRO A LOGUEARSE");
  if (!req.user) {
    req.logger.error("No se inicio sesion, credenciales invalidas!!!!!!");
    return res.json({ status: "error", error: "credenciales invalidas" });
    // res
    //   .status(400)
    //   .send({ status: "error", error: "credenciales invalidas" });
  }

  let result = await userServiceDAO.login(req);
  console.log("result en sessions controller 41", result);
  if (result) {
    return res.json(result);
    //res.json({ status: "success", statusText: "se inicio sesion" });
    //res.send(result);
    // } else {
    //   req.logger.error("No se inicio sesion!!!!!!");
    //   return "no inicio sesion";
    //   // res.json({
    //   //   status: "error",
    //   //   statusText: "No se pudo iniciar sesion",
    //   // });
    //   //return res.send(401).json({ status: "error", error: error });
  }
};

const getInfoUserById = async (req, res) => {
  //console.log("buscando info usuario...");
  req.logger.info("buscando info usuario...!!!!!!");
  let id = req.params.id;
  console.log("130", id);
  let result = await userServiceDAO.getInfoUserById(id);
  if (result.status != "error") {
    return res.status(201).json(result);
  } else {
    return res.send(401).json({
      status: "error",
      error: "no se pudo obtener la informacion del usuario",
    });
  }
};

const logoutSession = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.json({ status: "Logout error", body: err });
    }
    res.status(201).json({ status: "success", payload: "logout ok!" });
    console.log("Se cerro la sesion correctamente...");
  });
};

const changeRol = async (req, res) => {
  req.logger.info("buscando info usuario...!!!!!!");
  let { id } = req.params;
  console.log("body ", req.body);
  let { rol } = req.body;
  console.log("87 newRol", rol);
  let user = await userServiceDAO.changeRol(req);
  // if (result.status != "error") {
  if (user) {
    console.log(user.rol);
    console.log(typeof user.rol);
    user.rol = rol;
    console.log("usuario actualizado rol quedo => ", user);
    let idUsuario = id.split(" ");

    let result = await userModel.updateOne({ _id: idUsuario[1] }, user);
    console.log(result);
    req.session.user.rol = rol;
    // return { status: "success", payload: req.user };
    // } else {
    //   return "no se pudo realizar la accion";
    // }

    res.status(201).json({
      status: "success",
      message: "se Actializo el rol satisfactoriamente",
    });
  } else {
    // res.send(401).json({
    //   status: "error",
    //   error: "no se pudo obtener la informacion del usuario",
    // });
    console.log("error al actualizar rol");
  }
};

export default {
  gitHub,
  githubcallback,
  register,
  login,
  getInfoUserById,
  logoutSession,
  changeRol,
};
